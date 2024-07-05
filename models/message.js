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
    message: {
        type: Sequelize.DataTypes.TEXT,
        allowNull:false
    },
    captcha_code: {
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    captcha_image: {
        type: Sequelize.DataTypes.BLOB('medium'),
        allowNull: false
    },
    captcha_image_format: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    additional_file: {
        type: Sequelize.DataTypes.BLOB('long'),
        allowNull: true
    },
    additional_file_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    },
    additional_file_format: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
})

module.exports = MessageModel