/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/12/13
 *
 * 描述 ：接口类 - 测试
 */
const apiBase = require('../apiBase')
const apiFactory = require('../apiFactory')

const _module = {
  moduleName: "test",
  apis: [{
    // 测试
    method: "get", // 请求方式
    name: "test", // 接口名称
    url: "/goods/category" // 接口全路径
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
