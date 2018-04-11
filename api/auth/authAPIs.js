/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/11/24
 *
 * 描述 ：接口类 - 授权
 */
const apiFactory = require('../apiFactory')

const _module = {
  moduleName: "auth",
  apis: [{
    // 登录
    method: "post", // 请求方式
    name: "login", // 接口名称
    url: "/login" // 接口全路径
  },{
    // 登出
    method: "post", // 请求方式
    name: "logout", // 接口名称
    url: "/logout" // 接口全路径
  },{
    // home
    method: "post", // 请求方式
    name: "home", // 接口名称
    url: "/home" // 接口全路径
  },{
    // 检查会话
    method: "post", // 请求方式
    name: "checkToken", // 接口名称
    url: "/checkToken" // 接口全路径
  }]
}

class apiSub extends apiBase {
  constructor(module) {
    super()
    this.moduleName = module.moduleName
    this.apis = module.apis
  }
}

module.exports = apiFactory(new apiSub(_module))
