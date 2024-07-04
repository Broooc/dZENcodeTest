const messageSchema = require('../validators/msgValidate')
const MessageRepository = require('../repositories/msgRepository')
const { Badrequest, Conflict } = require('../errors/errors')
const WebSocketService = require('./WSservice')


class MessageService {

    static async PostMessage({ email, user_name, text }) {

        await messageSchema.validate({user_name, email, text}).catch((err) => {
            throw new Badrequest(err.errors[0])
        })

        const insertedMessage = await MessageRepository.InsertNewMessage({ email, user_name, text }).catch((err) => {
            throw new Badrequest(err.errors[0].message)
        })

        await WebSocketService.sendNotificationToAllClients(insertedMessage)

        return insertedMessage
        
    }

}

module.exports = MessageService