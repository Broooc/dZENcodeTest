const { Sequelize } = require('sequelize');

const DBname = 'dzencodedb'

const password = 'root'

const username = 'root'

const connection = new Sequelize(null, username, password, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
})

connection.sync({ logging: false })

connection.query(`CREATE DATABASE IF NOT EXISTS ${DBname}`).then(() => {
    connection.close()
})

const newConnection = new Sequelize(DBname, username, password, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
})

newConnection.sync({ logging: false })

module.exports = newConnection