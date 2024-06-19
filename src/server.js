const http = require('http');

const app = require('./app');

const socketIo = require('socket.io');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = socketIo(server);

const connectedUsers = {};

global.io = io;

global.connectedUsers = connectedUsers;

require('../src/sockets/index')(global.io, global.connectedUsers);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});