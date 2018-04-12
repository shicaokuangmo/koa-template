/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/04/02
 *
 * 描述 ：日志信息格式化类
 */
"use strict" // 定义为严格模式编码要求

function getTextTemplate({ level, textObj, formatFun }) {

    if("string" != typeof level){
        throw new Error("level must be string !") ;
    }

    if("object" != typeof textObj){
        throw new Error("textObj must be object !") ;
    }

    level = level.toLowerCase() ;

    switch (level){
        case "info":{
            let _logText = new String() ;

            //响应日志开始
            _logText += "\n" + "*************** info log start ***************" + "\n";

            //添加请求日志
            _logText += formatFun ;

            //响应日志结束
            _logText += "*************** info log end ***************" + "\n";

            return _logText;
        }
        break;
        case "error":{
            let _logText = new String() ;

            //错误信息开始
            _logText += "\n" + "*************** error log start ***************" + "\n";

            //添加请求日志
            _logText += formatFun ;

            //错误信息结束
            _logText += "*************** error log end ***************" + "\n";

            return _logText;
        }
        break;
        default:{
            return "loggerLevel is Empty !";
        }
    }
}

// 请求格式文本
function _formatReqLog(req, resTime, ex) {
    let _logText = new String();

    //访问方法
    _logText += "request method: " + req.method + "\n";

    // 请求头
    _logText += "request header: " + JSON.stringify(req.header) + "\n";

    //请求原始地址
    _logText += "request url:  " + req.url + "\n";

    //客户端ip
    _logText += "request client ip:  " + req.ip + "\n";

    //请求参数
    if ("get" === req.method.toLowerCase()) {
        _logText += "request query:  " + JSON.stringify(req.query) + "\n";
    }
    else {
        _logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
    }
    //服务器响应时间
    _logText += "response time: " + resTime + "ms\n";

    if(ex) {
        //错误名称
        _logText += "error name: " + ex.name + "\n";
        //错误详情
        _logText += "error stack: " + ex.stack + "\n";
    }

    return _logText;
}

// 数据库格式文本
function _formatDBLog(dbInfo, ex) {
    let _logText = new String();

    //数据库名称
    _logText += "database name: " + dbInfo.dbName + "\n";

    //数据库账号
    _logText += "database user: " + dbInfo.userName + "\n";

    if(ex) {
        //错误名称
        _logText += "error name: " + ex.name + "\n";
        //错误详情
        _logText += "error stack: " + ex.stack + "\n";
    }

    return _logText;
}

// 缓存格式文本
function _formatCacheLog(cacheInfo, ex) {
    let _logText = new String();

    // 缓存类型
    _logText += "cache type: " + cacheInfo.type + "\n";

    // 缓存服务地址
    _logText += "cache host: " + cacheInfo.host + "\n";

    // 缓存服务端口
    _logText += "cache port: " + cacheInfo.port + "\n";

    if(ex) {
        //错误名称
        _logText += "error name: " + ex.name + "\n";
        //错误详情
        _logText += "error stack: " + ex.stack + "\n";
    }

    return _logText;
}

module.exports = {
    // 导出模块接口
    getReqText : (options) => {
        //console.log(getTextTemplate(option)) ;
        return getTextTemplate({ level: options.level, textObj: options.textObj, formatFun: _formatReqLog(options.textObj.req, options.textObj.resTime, options.textObj.ex) }) ;
    },
    getDataBaseText : (options) => {
        return getTextTemplate({ level: options.level, textObj: options.textObj, formatFun: _formatDBLog(options.textObj.dbInfo, options.textObj.ex) }) ;
    },
    getCacheText : (options) => {
        return getTextTemplate({ level: options.level, textObj: options.textObj, formatFun: _formatCacheLog(options.textObj.cacheInfo, options.textObj.ex) }) ;
    }
} ;
