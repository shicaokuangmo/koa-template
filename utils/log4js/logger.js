/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/04/02
 *
 * 描述 ：日志工具类
 */
"use strict" // 定义为严格模式编码要求

var _log4js = require('log4js') ;
var $config = require('./logConfig') ;

class logger {
    constructor(type){

        _log4js.configure($config(type)) ;
    }
    info(text){
        _log4js.getLogger("info").info(text) ;
    }
    error(text){
        _log4js.getLogger("error").error(text) ;
    }
}
module.exports = (type) => {
    return new logger(type) ;
}