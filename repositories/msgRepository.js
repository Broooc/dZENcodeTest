const MessageModel = require('../models/message')

class MessageRepository {
    static async InsertNewMessage({ email, user_name, text }) {
        const newMessage = await MessageModel.create({ email: email, user_name: user_name, text: text })

        await newMessage.save()

        return newMessage
    }
}

module.exports = MessageRepository