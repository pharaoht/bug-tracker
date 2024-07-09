const db = require("../../database/db.connection");

class MessageRepository {

    constructor(){
        this._tableName = 'messages'
    }

    async repoGetMessagesByReceiverId(senderId, receiverId){

        const query = `
            SELECT 
				messages.*,
                sender.firstName AS sender_firstName,
                sender.lastName AS sender_lastName,
                sender.id AS sender_id,
                sender.imageUrl AS sender_imageUrl,
                receiver.firstName  AS receiver_firstName,
                receiver.lastName AS receiver_lastName,
                receiver.id AS receiver_id,
                receiver.imageUrl AS receiver_imageUrl                
            FROM ${this._tableName}
            JOIN users AS sender ON messages.sender_id = sender.id
            JOIN users AS receiver ON messages.receiver_id = receiver.id
            WHERE (messages.sender_id = ? AND messages.receiver_id = ?)
            OR (messages.sender_id = ? AND messages.receiver_id = ?)
            ORDER BY messages.createdAt ASC;
        `;

        return await db.execute(query, [senderId, receiverId, receiverId, senderId]);

    };

    async repoCreateMessage(senderId, receiverId, message){

        const query = `
            INSERT INTO ${this._tableName} (sender_id, receiver_id, message, readStatus)
            VALUES (?,?,?,0);
        `;

        return await db.execute(query, [senderId, receiverId, message]);
    };

    async repoGetConversations(senderId){

        const query = `
            SELECT 
                MAX(messages.id) AS id,
                messages.receiver_id,
                users.firstName AS receiver_firstName,
                users.lastName AS receiver_lastName,
                users.imageUrl AS receiver_imageUrl,
                MAX(messages.createdAt) AS createdAt,
                SUBSTRING_INDEX(GROUP_CONCAT(messages.message ORDER BY messages.createdAt DESC), ',', 1) AS message,
                SUBSTRING_INDEX(GROUP_CONCAT(messages.readStatus ORDER BY messages.createdAt DESC), ',', 1) AS readStatus
            FROM ${this._tableName} AS messages
            JOIN users ON messages.receiver_id = users.id
            WHERE messages.sender_id = ?
            GROUP BY messages.receiver_id, users.firstName, users.lastName, users.imageUrl;

        `;

        return await db.execute(query, [senderId]);
    };

    async repoUpdateMessage(messageId, message){

    }

    async repoDeleteMessage(messageId){

    }
}

const initMessageRepository = () => {
    return new MessageRepository();
}

module.exports = initMessageRepository;