const NotificationRepository = require("../../notification/repository/notification.repository");

class NotificationService extends NotificationRepository {

    constructor(io, connectedUsers){
        super();
        this.io = io;
        this.connectedUsers = connectedUsers;
    }

    async createNotification(userId, issueId, commentId, userName, issueTitle, commentMessage, ownerId){

        try{

            console.log(this.connectedUsers)

            //generate message
            const message = await this.createMessage(userName, issueTitle, commentMessage);

            //sql to handle creating new notification
            //store message in dataabse
            await this.repoCreateNotification(userId, issueId, commentId, commentMessage);
             console.log(ownerId)
            if(this.connectedUsers.hasOwnProperty(ownerId)){
               
                this.io
                .to(this.connectedUsers[ownerId])
                .emit('newCommentOnIssue', { message: message });

            };

            return true;
        }
        catch(error){

            console.log('Error while creating a notification', error)

            console.error(error.message);

            return false;

        }

    };

    async createMessage(userName, issueTitle, commentMessage){
        return ` ${userName}, has just left a comment on issue ${issueTitle}. " ${commentMessage} "`;
    }
};

// Factory function to create NotificationService instance
const createNotificationService = () => {
    return new NotificationService(global.io, global.connectedUsers);
};

module.exports = {
    createNotificationService
}