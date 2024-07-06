const { ErrorUtils } = require('../errors/errors')
const CaptchaService = require('../services/CaptchaService')

class CaptchaController {

    static async sendCaptcha(req, res) {

        try {

            const { fingerprint } = req
            
            const { captchaToken, image } = await CaptchaService.createCaptcha(fingerprint)

            res.cookie("captchaToken", captchaToken)

            return res.send(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Test Captcha</title>
                    </head>
                    <body>
                    ${image}
                    <p>Send POST request to the <strong>http://localhost:8001/message/submit-captcha</strong> and to the request body write: {"code": "captcha_code"}</p>
                    </body>
                </html>
            `)
            
        } catch (err) {
            console.log(err)
            return ErrorUtils.catchError(res, err)
        }

    }

    static async verifyCaptcha(req, res) {

        try {

            const captchaToken = req.cookies.captchaToken

            const accessToken = await CaptchaService.VerifyCaptcha(captchaToken, req.body.code)

            res.clearCookie("captchaToken")

            res.cookie("accessToken", accessToken)

            return res.status(200).send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Test Captcha</title>
                </head>
                <body>
                <p>Now you can send POST request to the <strong>http://localhost:8001/message/new-message</strong> and create a new message; <br>Body example: <br>{<br>"message": "text message"<br>"email": "myEmail@mail.com"<br>"user_name": "user1"<br>"additional_data": "image.png/text.txt"<br>}</p>
                <p>If you are using Postman, use form-data to send data</p>
                </body>
            </html>
        `);

        } catch (err) {
            console.log(err)
            return ErrorUtils.catchError(res, err)
        }

    }

}

module.exports = CaptchaController