const db = require("../../database/db.connection");

class NotificationRepository {

    constructor(){
        this._tableName = 'notification'
    }

    async repoCreateNotification(userId, issueId, commentId, commentText){

        const query = `
            INSERT INTO ${this._tableName}(user_id, issue_id, comment_id, message, readStatus)
            VALUES(?,?,?,?, 0)
        `;

        return await db.execute(query, [userId, issueId, commentId, commentText])
    }

    async repoDeleteNotification(){

    }

    async repoGetNotificationsByUserId(){

    }

    async repoGetNotificationByIssueId(){

    }
};

module.exports = NotificationRepository;