/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/2/27
 *
 * 描述 ：api请求基类
 */
class apiBase {
  constructor() {
  }
  requestFun (config) {
    // console.log("api请求基类===================>请求拦截：", JSON.stringify(config))
    return config
  }
  requestError (error) {
    // console.log("api请求基类===================>请求错误拦截：", JSON.stringify(error))
  }
  responseFun (data) {
   // console.log("api请求基类===================>响应拦截：", JSON.stringify(data.data))
    return data
  }
  responseError (error) {
   // console.log("api请求基类===================>响应错误拦截：", JSON.stringify(error))
  }
}
module.exports = apiBase