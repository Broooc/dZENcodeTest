# dZENcodeTest

This is a test Node.js app to show my coding skills

In this Node.js app I'm using ExpressJS, WebSocket, ORM, Git, MySQL, CAPTCHA verification and Docker

# _REST API_

First, we need to pass CAPTCHA authentication, and for that, we need request it

Send GET request to this endpoint:

http://192.168.0.104:5000/message/get-captcha

You will get an SVG CAPTCHA image and captchaCookie, and after finding the code you need to make the following POST request:

http://192.168.0.104:5000/message/submit-captcha

In the body of the request, you need to pass the CAPTCHA code, like this:

{
    "code": "yourcaptchacode"
}

If you have entered the correct code, you will receive a message that everything is fine and also you will receive a cookie access token

After that, you can create messages and store them in MySQL database:

To do this, you need to send a POST request:

http://192.168.0.104:5000/message/new-message

The message's body must look like this:

{
    "user_name": "username",
    "email": "mail@mail.com",
    "message": "your message"
}

But if you want, you can attach image or text file:

{
    "user_name": "username",
    "email": "mail@mail.com",
    "message": "your message",
    "additional_file": "image.png/text.txt"
}

*Note*

If you're using Postman, and want to send an additional_file, use form-data instead of raw in body

Also, you can get all the messages from the database, you just need to make this GET request:

http://192.168.0.104:5000/message/all-messages

And you can even delete a message from a MySQL database, you only need to pass the row ID to the DELETE request as a query parameter:

http://192.168.0.104:5000/message/delete-message?id=number

# _WebSocket_

Also, you can connect to this application by websocket and receive a message if somebody creating new message

This is a gitHub repository, which you can clone, and try to connect to the websocket:

https://github.com/Broooc/dZENcodeWebSocketClient.git

