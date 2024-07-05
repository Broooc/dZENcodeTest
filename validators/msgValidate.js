const Yup = require('yup')

const messageSchema = Yup.object().shape({
    user_name: Yup.string()
        .required('The name was not passed to the request')
        .min(2, 'The name is too short, at least it must have 2 symbols')
        .max(40, 'The name is too long, the allowed length is 40 symbols'),
    email: Yup.string()
        .required('The email was not passed to the request')
        .email('The email is invalid')
        .min(8, 'The email is too short, at least it must have 8 symbols')
        .max(50, 'The email is too long, the allowed length is 50 symbols'),
    message: Yup.string()
        .required('The message was not passed to the request')
        .min(2, 'The message is too short, at least it must have 2 symbols')
        .max(1000, 'The message is too long, the maximum amount of symbols in 1000')
})

module.exports = messageSchema