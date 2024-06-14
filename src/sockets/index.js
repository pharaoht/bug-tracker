const NotificationService = require('../services/notification/notification.services');
const messagesSocket = require('./messages.socket');
const notificationSocket = require('./notifications.socket');

module.exports = function(io) {

    const connectedUsers = {};

    const notificationService = new NotificationService(io, connectedUsers);

    io.on('connection', (socket) => {

        socket.on('userConnected', (userId) => {

            connectedUsers[userId] = socket.id;

            console.log(`!User: ${connectedUsers[userId]} is connected!`)

        });

        socket.on('disconnect', () => {

            const userId = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket.id);

            delete connectedUsers[userId];

            console.log('User disconnected');

        });
    });

    messagesSocket(io);

    notificationSocket(io);

    return {
        notificationService
    }
};