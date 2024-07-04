const { Sequelize } = require('sequelize');

const connection = new Sequelize('dzencodeDB', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

connection.sync({logging: false})

module.exports = connection