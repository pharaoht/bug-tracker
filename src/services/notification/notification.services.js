const NotificationRepository = require("../../notification/repository/notification.repository");

class NotificationService extends NotificationRepository {

    constructor(io, connectedUsers){
        super();
        this.io = io;
        this.connectedUsers = connectedUsers;
    }

    async createNotification(issueId, commentId, userName, issueTitle, commentMessage, ownerId){

        try{

            const message = await this.createMessage(userName, issueTitle, commentMessage);

            await this.repoCreateNotification(ownerId, issueId, commentId, message);

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
        return ` ${userName}, has left a comment on issue ${issueTitle}. " ${commentMessage} "`;
    }
};

// Factory function to create NotificationService instance
const createNotificationService = () => {
    return new NotificationService(global.io, global.connectedUsers);
};

module.exports = {
    createNotificationService
}