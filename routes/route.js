const router = require('express').Router();
const messageController = require('../controllers/msgController');
const CaptchaController = require('../controllers/CaptchaController')
const TokenService = require('../services/TokenService')
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/new-message', upload.single('additional_file'), TokenService.verifyAccessToken, messageController.postNewMessage)

router.get('/all-messages', TokenService.verifyAccessToken, messageController.getAllMessages)

router.delete('/delete-message', TokenService.verifyAccessToken, messageController.deleteMessage)

router.get('/get-captcha', CaptchaController.sendCaptcha)

router.post('/submit-captcha', CaptchaController.verifyCaptcha)

module.exports = router