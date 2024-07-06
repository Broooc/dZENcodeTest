const { Sequelize } = require('sequelize');

const connection = new Sequelize('dzencodeDB', 'root', 'root', {
    host: process.env.HOST,
    dialect: 'mysql'
})

connection.sync({logging: false})

module.exports = connection