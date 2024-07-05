const messageSchema = require('../validators/msgValidate')
const MessageRepository = require('../repositories/msgRepository')
const { Badrequest, Conflict } = require('../errors/errors')
const WebSocketService = require('./WSservice')
const { ImageValidation } = require('../validators/imageValidate')


class MessageService {

    static async PostMessage({ email, user_name, message, userAccessToken, additional_file }) {

        await messageSchema.validate({user_name, email, message}).catch((err) => {
            throw new Badrequest(err.errors[0])
        })

        let additionalFileData = {
            email,
            user_name,
            message,
            captcha_code: userAccessToken.value,
            captcha_image: userAccessToken.image,
            captcha_image_format: '.svg',
        };

        if (additional_file) {
            if (additional_file.mimetype.includes('image/')) {
                const { sharpImage, metadata } = await ImageValidation(additional_file.buffer)

                additionalFileData.additional_file = sharpImage
                additionalFileData.additional_file_format = '.' + metadata.format,
                additionalFileData.additional_file_name = additional_file.originalname
            
            } else if (additional_file.mimetype.includes('text/') && additional_file.size < 100000) {

                additionalFileData.additional_file = additional_file.buffer
                additionalFileData.additional_file_format = '.txt',
                additionalFileData.additional_file_name = additional_file.originalname
            
            }
        }
        
        const insertedMessage = await MessageRepository.InsertNewMessage({ ...additionalFileData }).catch((err) => {
            console.log(err.message)
            if (err.message.includes("Data too long for column 'additional_file'")) {
                throw new Badrequest('The image is too big')
            } else {
                throw new Badrequest(err.errors[0].message)
            }
        })

        await WebSocketService.sendNotificationToAllClients(insertedMessage)

        return insertedMessage
        
    }

    static async getAllMessages() {

        const allMessages = await MessageRepository.GetAllMessages()

        return { messagesCount: allMessages.length, messages: allMessages }

    }

    static async deleteMessage(id) {

        const deletedMessage = await MessageRepository.DeleteMessage(id)

        return deletedMessage
    }

}

module.exports = MessageService