/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/4/12
 *
 * 描述 ：cacheHelper
 */
const $redis = require('../utils/redis')

const $options = {
    cacheName: "auth"
}

class cacheHelper {
    constructor(data) {
        this.data = data;
        this.cache = $redis($options);
    }
    set ({ key, value, expires }) {
        return this.cache.set({ key, value, expires });
    }
    get ({ key }) {
        return this.cache.get({ key });
    }
}

module.exports = (data) => {
    return new cacheHelper(data);
}