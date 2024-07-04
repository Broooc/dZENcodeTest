const router = require('express').Router();
const messageController = require('../controllers/msgController');
const CaptchaController = require('../controllers/CaptchaController')

router.post('/new-message', messageController.postNewMessage)

router.get('/get-captcha', CaptchaController.sendCaptcha)

router.post('/submit-captcha', CaptchaController.verifyCaptcha)

module.exports = router