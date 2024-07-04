const TokenService = require('./TokenService')


class CaptchaService {

    static async createCaptcha(fingerprint) {

        console.log(fingerprint)

        const token = await TokenService.generateToken(fingerprint)

        return {token}
        
    }

    static async VerifyCaptcha(token) {
        
        const verifiedToken = await TokenService.verifyToken(token)
        
        return verifiedToken

    }

}

module.exports = CaptchaService