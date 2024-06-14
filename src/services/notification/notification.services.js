
class NotificationService {

    constructor(io, connectedUsers){
        this.io = io;
        this.connectedUsers = connectedUsers;
    }

    async createNotification(userId, issueId){

        try{
            //generate message
            const message = '';

            //sql to handle creating new notification

            if(this.connectedUsers[userId]){

                this.io
                .to(this.connectedUsers[userId])
                .emit('newCommentOnIssue', { message: message });

            };
        }
        catch(error){

        }

    };

    async createMessage(){

    }
};


module.exports = NotificationService