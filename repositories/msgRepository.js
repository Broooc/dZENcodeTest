const MessageModel = require('../models/message')
const { NotFound } = require('../errors/errors')

class MessageRepository {
    static async InsertNewMessage({ ...data }) {

        const newMessage = await MessageModel.create({ ...data })

        await newMessage.save()

        return newMessage
    }

    static async GetAllMessages() {

        const allMessages = await MessageModel.findAll()

        return allMessages
    }

    static async DeleteMessage(id) {

        const deletedMessage = await MessageModel.destroy({ where: { id: id } })

        if (deletedMessage === 1) {
            return `Message with id=${id} deleted successfully`
        } else {
            throw new NotFound("There's no row in DB with that id")
        }

    }
}

module.exports = MessageRepository