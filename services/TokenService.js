const jwt = require('jsonwebtoken');

class TokenService {

    static async generateToken(payload) {

        const secretKey = process.env.SECRET_KEY

        return jwt.sign(payload, secretKey, { expiresIn: '10m' })

    }

    static async verifyToken(token) {

        const secretKey = process.env.SECRET_KEY

        const decryptedToken = jwt.verify(token, secretKey)

        return decryptedToken

    }

}

module.exports = TokenService