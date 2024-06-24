const NotificationRepository = require("../../notification/repository/notification.repository");
const { initIssueDataAccessLayer } = require('../../notification/dal/notification.dal');

class NotificationService extends NotificationRepository {

    constructor(io, connectedUsers){
        super();
        this.io = io;
        this.connectedUsers = connectedUsers;
    }

    async createNotification(issueId, commentId, userName, issueTitle, commentMessage, ownerId){

        try{

            const message = await this.createMessage(userName, issueTitle, commentMessage);

            const [result] = await this.repoCreateNotification(ownerId, issueId, commentId, message);

            const insertedId = result.insertId;

            if(this.connectedUsers.hasOwnProperty(ownerId)){
               
                const result = await this.repoGetNotificationById(insertedId);

                const notificationDal = initIssueDataAccessLayer();

                const [dto] = await notificationDal.toDto(result);

                this.io
                .to(this.connectedUsers[ownerId])
                .emit('newCommentOnIssue', { message: dto });

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