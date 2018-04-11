/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2016-12-21
 *
 * 描述 ：统一异常捕获 - 中间件
 */
"use strict"; // 定义为严格模式编码要求

const logger = require("../utils/log4js/logger") ;
const loggerFormatter = require("../utils/log4js/loggerFormatter") ;

function _loadTextObj({ ctx, ex = {}, ms }) {
    let textObj = {
        req: ctx.request,
        ex: ex,
        resTime: ms
    };
    // console.log("ctx.req========================================================>", ctx.response)
    return textObj;
}

module.exports = () => {

    return async (ctx, next) => {

        //响应开始时间
        const start = new Date();

        //响应间隔时间
        let ms;

        try {

            await next();

            // 记录请求信息【每一次请求都写日志，开销太大】
            // ms = new Date() - start;
            //
            // logger(logConfig).info(loggerFormatter.getReqText({ level: "info", textObj: _loadTextObj({ ctx: ctx, ms: ms }) }));
        }
        catch (ex) {

            await ctx.render("error", { message: "出错了！！", error: ex });

            // 记录请求信息
            ms = new Date() - start;

            logger("req").error(loggerFormatter.getReqText({ level: "error", textObj: _loadTextObj({ ctx: ctx, ex: ex, ms: ms }) }));

        }
    }
};
