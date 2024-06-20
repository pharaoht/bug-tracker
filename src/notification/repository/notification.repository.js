const db = require("../../database/db.connection");

class NotificationRepository {

    constructor(){
        this._tableName = 'notifications'
    }

    async repoCreateNotification(userId, issueId, commentId, commentText){

        const query = `
            INSERT INTO ${this._tableName}(user_id, issue_id, comment_id, message, readStatus)
            VALUES(?,?,?,?, 0)
        `;

        return await db.execute(query, [userId, issueId, commentId, commentText])
    }

    async repoDeleteNotification(notificationId){
    
        const queryDelete = `
            DELETE FROM ${this._tableName}
            WHERE id = ?;
        `;

        return await db.execute(queryDelete, [notificationId]);
    }

    async repoGetNotificationsByUserId( userId ){

        const query = `
            SELECT *
            FROM ${this._tableName}
            WHERE user_id = ?
        `;

        return await db.execute(query, [ userId ]);
    }

    async repoGetNotificationByIssueId(){

    }

    async repoUpdateNotificationToRead( notificationId ){

        const query = `
            UPDATE ${this._tableName}
            SET
                readStatus = 1,
            WHERE
                id = ?
        `;

        return await db.execute(query, [notificationId]);
    }
};

module.exports = NotificationRepository;