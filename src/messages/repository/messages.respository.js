const db = require("../../database/db.connection");

class MessageRepository {

    constructor(){

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
            FROM messages
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
            INSERT INTO messages (sender_id, receiver_id, message, readStatus)
            VALUES (?,?,? 0);
        `;

        return await db.execute(query, [senderId, receiverId, message]);
    }

    async repoUpdateMessage(messageId, message){

    }

    async repoDeleteMessage(messageId){

    }
}

const initMessageRepository = () => {
    return new MessageRepository();
}

module.exports = initMessageRepository;