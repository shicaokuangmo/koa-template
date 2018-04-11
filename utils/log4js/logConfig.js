/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/04/02
 *
 * 描述 ：日志配置类
 */
"use strict"; // 定义为严格模式编码要求

const path = require('path');

//日志根目录
const baseLogPath = path.resolve(__dirname, '../../logs');

module.exports = (subPath) => {

    return {
        appenders: {
            //错误日志
            error: {
                category: "errorLogger",             //logger名称
                type: "dateFile",                   //日志类型
                filename: `${baseLogPath}/error/${subPath}/error`,             //日志输出位置
                alwaysIncludePattern: true,          //是否总是有后缀名
                pattern: "-yyyy-MM-dd-hh.log",       //后缀，每小时创建一个新的日志文件
                path: `${baseLogPath}/error`
            },
            //信息日志
            info: {
                category: "infoLogger",
                type: "dateFile",
                filename: `${baseLogPath}/info/${subPath}/info`,
                alwaysIncludePattern: true,
                pattern: "-yyyy-MM-dd-hh.log",
                path: `${baseLogPath}/info`
            }
        },
        categories: {
            default: {appenders: ['info'], level: 'INFO'},
            error: {appenders: ['error'], level: 'ERROR'}
        }
    }
}