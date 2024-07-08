const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
const ConnectionParams = require('./dbcobfig')

dotenv.config()

const DBname = 'dzencodedb'

const connection = new Sequelize(null, ConnectionParams.username, ConnectionParams.password, {
    host: ConnectionParams.host,
    port: ConnectionParams.port,
    dialect: 'mysql',
    logging: false
})

connection.sync({ logging: false })

connection.query(`CREATE DATABASE IF NOT EXISTS ${DBname}`).then(() => {
    connection.close()
})

const newConnection = new Sequelize(DBname, ConnectionParams.username, ConnectionParams.password, {
    host: ConnectionParams.host,
    port: ConnectionParams.port,
    dialect: 'mysql',
    logging: false
})

newConnection.sync({ logging: false })

module.exports = newConnection