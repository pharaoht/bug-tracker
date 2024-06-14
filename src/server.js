const http = require('http');

const app = require('./app');

const socketIo = require('socket.io');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = socketIo(server);

const { notificationService } = require('./sockets/index')(io);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});

module.exports = {
    notificationService
}