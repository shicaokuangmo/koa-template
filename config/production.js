/**
 * 作者 ：吃草的兔子
 *
 * 日期 ：2017/12/02
 *
 * 描述 ：业务配置文件 - 生产环境
 */
module.exports = {
    env: 'production',
    port: '3001',
    apis: {
        modules: {
            // 目录审核
            checkDir: {
                host: '',
                url: '/checkDir'
            },
            // 目录管理
            dir: {
                host: '', // http://192.168.112.47:8081
                url: '/dir'
            },
            // 测试用
            test: {
                host: '',
                url: '/portalInterface'
            }
        },
        defaultHost: 'http://www.youedata.com',//'http://192.168.112.3:8089',//'',//'http://210.13.50.98:10133', //http://www.youedata.com/portalInterface/goods/category
        defaultUrl: ''
    },
    databases: {
        defaultHost: '192.168.0.113',
        defaultPort: 3306,
        koadb: {
            type: 'mysql',
            host: '',
            port: '',
            dbName: 'koadb',
            userName: 'root',
            userPass: 'root'
        }
    },
    siteInfo: {
        // 多站点配置
        sites: {
            login_site_host: 'http://login.mainsite.com/', // 登录站地址
            main_site_host: 'http://www.mainsite.com/',  // 本站地址
            file_server_url: "http://www.pro.com"   // 文件服务器地址
        }
    }
}