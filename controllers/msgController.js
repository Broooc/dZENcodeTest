const MessageService = require('../services/msgService')
const { ErrorUtils } = require('../errors/errors')

class messageController {

    static async postNewMessage(req, res) {

        try {

            const { email, user_name, text } = req.body

            const response = await MessageService.PostMessage({ email, user_name, text })
    
            return res.status(201).json(response)

        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }

    }

}

module.exports = messageController