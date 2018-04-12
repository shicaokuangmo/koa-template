/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/4/10
 *
 * 描述 ：ORM类封装
 */
"use strict" // 定义为严格模式编码要求

const $config = require('../config');
const orm = require('sequelize');
const logger = require('./log4js/logger');
const loggerFormatter = require("./log4js/loggerFormatter");

class sequelize {
    constructor(data) {

        if ("string" != typeof data.databaseName) {
            throw new Error(`the sequelize constructor databaseName must be string !`);
        }

        this.dbInfo = $config.databases[data.databaseName];

        this.orm = new orm(
            this.dbInfo.dbName,
            this.dbInfo.userName,
            this.dbInfo.userPass,
            {
                host: `${this.dbInfo.host || $config.databases.defaultHost}`,
                dialect: this.dbInfo.type,
                port: `${this.dbInfo.port || $config.databases.defaultPort}`,
                operatorsAliases: false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                timezone: '+08:00' //东八时区
            }
        ) ;

        // console.log("准备测试数据库连接................")

        this._testConnection();
    }

    insert({ tableName, values }) {
        if ("string" != typeof tableName) {
            throw new Error("the tableName must be string !");
        }
        if ("object" != typeof values) {
            throw new Error("the tableName must be object !");
        }

        let _model = this._getModel({ tableName, columnsInfo: this._getColumns(values) });
        return _model.create(values);
    }

    del() {
    }

    update() {
    }

    select({ tableName, where = {} }) {
        if ("string" != typeof tableName) {
            throw new Error("the tableName must be string !");
        }

        let _model = this._getModel({ tableName });
        return _model.findAll({ where });
    }

    selectOne({ tableName, where = {} }) {
        if ("string" != typeof tableName) {
            throw new Error("the tableName must be string !");
        }

        let _model = this._getModel({ tableName, columnsInfo: this._getColumns(where) });

        console.log("where========>", where)

        return _model.findOne({ where });
    }

    // 测试数据库连接
    _testConnection () {
        let self = this;
        self.orm.authenticate()
            .then(() => {
                // console.log('Connection has been established successfully.', loggerFormatter.getDataBaseText({ level: "info", textObj: { dbInfo: self.dbInfo } }));
                //
                // logger("db").info(loggerFormatter.getDataBaseText({ level: "info", textObj: { dbInfo: self.dbInfo } }));
            })
            .catch(err => {

                console.error('Unable to connect to the database:', err);

                logger("db").error(loggerFormatter.getDataBaseText({ level: "error", textObj: { dbInfo: self.dbInfo, ex: err } }));

            });
    }

    // 获取数据库表模型
    _getModel({ tableName, columnsInfo = {} }) {
        if ("string" != typeof tableName) {
            throw new Error("the tableName must be string !");
        }
        return this.orm.define(tableName, columnsInfo, {
            timestamps: true
        });
    }

    // 对象转换为列
    _getColumns(obj){
        if ("object" != typeof obj) {
            throw new Error("the column values must be object !");
        }

        let _result = {};

        for(let key in obj){
            _result[key] = orm.STRING
        }

        return _result;
    }
}

module.exports = ({ databaseName }) => {
    return new sequelize({ databaseName: databaseName });
}