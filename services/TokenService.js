const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/errors')

class TokenService {

    static async generateToken(payload, secretKey, params) {

        return jwt.sign(payload, secretKey, {
            h
        })

    }

    static async verifyToken(token, secretKey) {

        const decryptedToken = jwt.verify(token, secretKey)

        return decryptedToken

    }

    static async verifyAccessToken(req, res, next) {

        const accessToken = req.cookies.accessToken

        if (!accessToken) {
            return next(new Unauthorized('No access token provided'))
        }

        const secretAccessKey = process.env.ACCESS_SECRET_KEY

        try {
            const verifiedAccessToken = await TokenService.verifyToken(accessToken, secretAccessKey)

            req.userAccessToken = verifiedAccessToken
        } catch (err) {
            console.log(err)
            return res.status(403).json({error: err.message, status: 403})
        }

        next()
        
    }

}

module.exports = TokenService