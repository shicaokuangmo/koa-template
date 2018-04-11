/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/4/10
 *
 * 描述 ：dbHelper
 */

const $sequelize = require('../utils/sequelize')

const $options = {
    databaseName: "koadb"
}

class dbHelper {
    constructor() {
        this.mysqlHelper = $sequelize($options);
    }
    insert ({ tableName, values }) {
        // console.log("values:", values)
        return this.mysqlHelper.insert({ tableName, values });
    }
    del () {}
    update () {}
    select ({ tableName, where }) {
        return this.mysqlHelper.select({ tableName, where });
    }
    selectOne ({ tableName, where }) {
        return this.mysqlHelper.selectOne({ tableName, where });
    }
}

module.exports = dbHelper;