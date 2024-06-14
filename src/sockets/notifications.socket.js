module.exports = function (io) {
    io.on('connection', (socket) => {
        // Handle notifications-related socket events
        // ...
        socket.io('newCommentOnIssue', ( data ) => {

            const { message } = data;
        })
    });
};
