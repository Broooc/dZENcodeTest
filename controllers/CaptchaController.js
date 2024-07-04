const { ErrorUtils } = require('../errors/errors')
const CaptchaService = require('../services/CaptchaService')

class CaptchaController {

    static async sendCaptcha(req, res) {

        try {

            const { fingerprint } = req
            
            const { token, image } = await CaptchaService.createCaptcha(fingerprint)

            res.cookie("captchaToken", token)

            return res.send(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Test Captcha</title>
                    </head>
                    <body>
                    ${image}
                    <input type="text" class="input" />
                    <button class="button">Submit</button>
                    <script>
                        document.querySelector(".button").addEventListener('click', async () => {
                            let inputValue = document.querySelector(".input").value;

                            const response = await fetch('http://192.168.0.104:5000/message/submit-captcha', {
                                method: "post",
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify({ code: inputValue }),
                            })

                        })
                    </script>
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

            const isCaptchaValid = await CaptchaService.VerifyCaptcha(req.cookies.captchaToken, req.body.code)

            return res.send(isCaptchaValid)

        } catch (err) {
            console.log(err)
            return ErrorUtils.catchError(res, err)
        }

    }

}

module.exports = CaptchaController