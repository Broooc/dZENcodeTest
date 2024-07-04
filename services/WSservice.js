const socket = require('../webSocket');
const WebSocket = require('ws');

class WebSocketService {
    static async sendNotificationToAllClients(message) {

        const userInfo = structuredClone(message);

        delete userInfo.dataValues["text"];

        const messageToTheClient = JSON.stringify({
            message: `${message.user_name} posted new message: ${message.dataValues.text}`,
            additional_data: userInfo.dataValues
        });

        socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messageToTheClient);
            };
        });

        return;
    };
};

module.exports = WebSocketService