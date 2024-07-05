const MessageService = require('../services/msgService')
const { ErrorUtils } = require('../errors/errors')

class messageController {

    static async postNewMessage(req, res) {

        try {

            const { email, user_name, message } = req.body

            const additional_file = req.file

            const userAccessToken = req.userAccessToken

            const response = await MessageService.PostMessage({ email, user_name, message, userAccessToken, additional_file })
    
            return res.status(201).json(response)

        } catch (err) {
            console.log(err)
            return ErrorUtils.catchError(res, err)
        }

    }

    static async getAllMessages(req, res) {
          
        try {

            const response = await MessageService.getAllMessages()

            return res.status(200).json(response)


        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }

    }

    static async deleteMessage(req, res) {
        
        try {

            const messageId = req.query.id

            const response = await MessageService.deleteMessage(messageId)

            return res.status(200).json({message: response});

        } catch (err) {
            console.log(err)
            return ErrorUtils.catchError(res, err)
        }
    }

}

module.exports = messageController