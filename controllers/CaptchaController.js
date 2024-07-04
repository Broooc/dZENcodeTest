const { ErrorUtils } = require('../errors/errors')
const CaptchaService = require('../services/CaptchaService')

class CaptchaController {

    static async sendCaptcha(req, res) {

        try {

            const { fingerprint } = req
            
            const { token } = await CaptchaService.createCaptcha(fingerprint)

            res.cookie("captchaToken", token)

            return res.send('success')

        } catch (err) {
            console.log(err)
            return ErrorUtils.catchError(res, err)
        }

    }

    static async verifyCaptcha(req, res) {

        try {

            const isCaptchaValid = await CaptchaService.VerifyCaptcha(req.cookies.captchaToken)

            return res.send(isCaptchaValid)

        } catch (err) {
            console.log(err)
            return ErrorUtils.catchError(res, err)
        }

    }

}

module.exports = CaptchaController