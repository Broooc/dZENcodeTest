const TokenService = require('./TokenService')
const nodeCaptcha = require('node-svgcaptcha');
const { Forbidden, Unauthorized } = require('../errors/errors')


class CaptchaService {

    static async createCaptcha(fingerprint) {

        const Capthca = nodeCaptcha({
            length: 4, // lenght of chars in generated captcha
            width: 150, // width of the generated image
            height: 100, // height of the generated image
            color: true, // true means that letters are painted in colors and false in gray scale
            lines: 2, // number of lines in the captcha
            noise: 1 // level of noise (points) in the captcha
        }) 

        const secretCaptchaKey = process.env.CAPTCHA_SECRET_KEY

        const captchaToken = await TokenService.generateToken({ fingerprint, value: Capthca.captchaValue, image: Capthca.svg }, secretCaptchaKey, { expiresIn: '10m' })

        return { captchaToken, image: Capthca.svg }
        
    }

    static async VerifyCaptcha(captchaToken, code) {

        if (!captchaToken) {
            throw new Unauthorized('No token provided');
        }
        
        try {

            const secretCaptchaKey = process.env.CAPTCHA_SECRET_KEY

            const verifiedCaptchaToken = await TokenService.verifyToken(captchaToken, secretCaptchaKey)
            
            if (verifiedCaptchaToken.value === code) {

                const secretAccessKey = process.env.ACCESS_SECRET_KEY

                const accessToken = await TokenService.generateToken({fingerprint: verifiedCaptchaToken.fingerprint, value: code, image: verifiedCaptchaToken.image}, secretAccessKey, { expiresIn: '1h' })

                return accessToken

            } else {
                throw new Error('The capthca code is invalid, try to send GET request to /get-captcha endpoint again to get new CAPTCHA')
            }

        } catch (err) {
            throw new Forbidden(err.message)
        }

    }

}

module.exports = CaptchaService