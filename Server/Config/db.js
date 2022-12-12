"use strict"
const { Sequelize } = require('sequelize');

const sequelize_mysql = new Sequelize('web_chat', 'root', '', {
  dialect: 'mysql',
  port: 3306,
  host: '127.0.0.1',
  pool: {
    maxConnections: 20,
    maxIdleTime: 30000
  },
})


async function db_transaction(sql, result) {
    let t
    new Promise((resolve, reject) => {
        try {
            sequelize_mysql.query(sql).then(async rows => {
            t = await sequelize_mysql.transaction()
            await t.commit()
            result = rows
          }).then(_ => {
            resolve()
          })
        } catch (error) {
          reject(error)
        }
    })
}

module.exports = {db_transaction}