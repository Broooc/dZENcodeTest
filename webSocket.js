const WebSocketServer = require('ws')

const webSocket = new WebSocketServer.Server({ port: 443 })

webSocket.on('connection', (ws) => {
    console.log('New client connected!')
    ws.send('Hello from WebSocket!')
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
})

module.exports = webSocket