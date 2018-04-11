/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/11/23
 *
 * 描述 ：api接口工厂类
 */
const config = require('../config')
const $ajax = require('../utils/axios')
const headerConfig = require('./headerConfig')

module.exports = (module) => {

    let apiObject = {}

    module.apis.forEach((item) => {
        apiObject[item.name] = (params) => {
            let locationId = ""
            if (params && params.URI) {
                locationId = `/${params.URI}`
                delete params.URI
            }

            // 所有接口必传参数
            return $ajax({
                method: item.method,
                url: `${config.apis.modules[module.moduleName].host}${config.apis.modules[module.moduleName].url || config.apis.defaultUrl}${item.url}${locationId}`,
                data: params,
                requestFun: module.requestFun,
                requestError: module.requestError,
                responseFun: module.responseFun,
                responseError: module.responseError,
                headers: item.headers || headerConfig
            })
        }
    })

    return apiObject
}
