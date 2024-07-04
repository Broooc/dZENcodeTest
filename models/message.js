const Sequelize = require('sequelize') 
const SequelizeConnection = require('../db')

const MessageModel = SequelizeConnection.define('message', {
    user_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull:false
    }
})

module.exports = MessageModel