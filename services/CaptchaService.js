const TokenService = require('./TokenService')
const nodeCaptcha = require('node-svgcaptcha');


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

        const token = await TokenService.generateToken({fingerprint, value: Capthca.captchaValue})

        return { token, image: Capthca.svg }
        
    }

    static async VerifyCaptcha(token, code) {
        
        const verifiedToken = await TokenService.verifyToken(token)
        
        if (verifiedToken.value === code) {
            return true
        } else {
            return false
        }

    }

}

module.exports = CaptchaService