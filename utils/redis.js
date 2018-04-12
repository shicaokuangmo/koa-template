/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/4/12
 *
 * 描述 ：redis
 */
"use strict" // 定义为严格模式编码要求

const $config = require('../config');
const $redis = require("redis");
const logger = require('./log4js/logger');
const loggerFormatter = require("./log4js/loggerFormatter");
const { promisify } = require('util');

class redis {
    constructor(data) {
        if ("string" != typeof data.cacheName) {
            throw new Error(`the redis constructor cacheName must be string !`);
        }

        let self = this;

        // 缓存配置
        this.cacheInfo = $config.caches[data.cacheName];

        // 初始化客户端
        this.client = $redis.createClient({
            host: this.cacheInfo.host,
            port: this.cacheInfo.port,
            password: this.cacheInfo.password
        });

        // 异常捕获
        this.client.on("error", function (err) {
            console.log('The redis refused the connection', err);

            logger("cache").error(loggerFormatter.getCacheText({
                level: "error",
                textObj: { cacheInfo: self.cacheInfo, ex: err }
            }));
        });
    }

    set({key, value, expires}) {
        // this key will expire after seconds
        this.client.set(key, value, 'EX', expires);
    }

    get({key}) {
        let getAsync = this._getAsync();
        return getAsync(key);
    }

    // Promise包装get接口
    _getAsync() {
        return promisify(this.client.get).bind(this.client);
    }
}

module.exports = ({cacheName}) => {
    return new redis({cacheName})
}