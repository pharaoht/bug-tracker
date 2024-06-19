const NotificationRepository = require("../../notification/repository/notification.repository");

class NotificationService extends NotificationRepository {

    constructor(io, connectedUsers){
        super();
        this.io = io;
        this.connectedUsers = connectedUsers;
    }

    async createNotification(userId, issueId, commentId, userName, issueTitle, commentMessage){

        try{

            //generate message
            const message = this.createMessage(userName, issueTitle, commentMessage);

            //sql to handle creating new notification
            //store message in dataabse
            await this.repoCreateNotification(userId, issueId, commentId, commentMessage);

            if(this.connectedUsers.hasOwnProperty(userId)){

                this.io
                .to(this.connectedUsers[userId])
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
        return `
            ${userName}, has just left a comment on issue ${issueTitle}.\n
            " ${commentMessage} "
        `;
    }
};

// Factory function to create NotificationService instance
const createNotificationService = () => {
    return new NotificationService(global.io, global.connectedUsers);
};

module.exports = {
    createNotificationService
}