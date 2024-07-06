const express = require('express')
const messageRouter = require('./routes/route')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const Fingerprint = require('express-fingerprint')
const cors = require('cors')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(Fingerprint({
    parameters:[
        Fingerprint.useragent,
        Fingerprint.acceptHeaders
    ]
}))
app.use("/message", messageRouter)

const listen = process.env.PORT || 5000

app.listen(listen, () => {
    console.log(`Server is running on port: ${listen}`)
})

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
})