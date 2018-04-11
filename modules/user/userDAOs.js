/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/4/10
 *
 * 描述 ：userDAOs
 */
const dbHelper = require('../dbHelper');
const uuidv1 = require('uuid/v1');
const $options = {
    tableName: "t_users"
}

class userDAOs extends dbHelper {
    constructor() {
        super();
    }
    getUserInfo (userName, userPass) {
        // console.log("this.options.tableName", this.options.tableName)
        return this.mysqlHelper.selectOne({ tableName: $options.tableName, where: { userName, userPass } });
    }
    addUser(userName, userPass) {
        return this.mysqlHelper.insert({ tableName: $options.tableName, values: { uuid: uuidv1(), userName, userPass } });
    }
}

module.exports = () => {
    return new userDAOs();
}