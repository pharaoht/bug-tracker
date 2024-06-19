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
            await this.repoCreateNotification();

            if(this.connectedUsers[userId]){

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

const notificationService = new NotificationService(global.io, global.connectedUsers)

module.exports = {
    notificationService
}