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
            ORDER BY messages.createdAt DESC;
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
                m1.id AS id,
                CASE 
                    WHEN m1.sender_id = ? THEN m1.receiver_id 
                    ELSE m1.sender_id 
                END AS receiver_id,
                u.firstName AS receiver_firstName,
                u.lastName AS receiver_lastName,
                u.imageUrl AS receiver_imageUrl,
                m1.message,
                m1.createdAt,
                m1.sender_id,
                m1.readStatus
            FROM
                messages m1
            JOIN
                users u ON CASE 
                            WHEN m1.sender_id = ? THEN m1.receiver_id 
                            ELSE m1.sender_id 
                        END = u.id
            WHERE
                m1.createdAt = (
                    SELECT MAX(m2.createdAt)
                    FROM messages m2
                    WHERE (m2.sender_id = ? OR m2.receiver_id = ?)
                    AND ((m2.sender_id = m1.sender_id AND m2.receiver_id = m1.receiver_id)
                        OR (m2.sender_id = m1.receiver_id AND m2.receiver_id = m1.sender_id))
                )
            ORDER BY
                m1.createdAt DESC;
        `;

        return await db.execute(query, [senderId, senderId, senderId, senderId]);
    };

    async repoGetUnReadMessages(receiverId){

        const query = `
            SELECT *
            FROM ${this._tableName}
            WHERE receiver_id = ? AND readStatus = 0
        
        `;

        return await db.execute(query, [receiverId])
    }

    async repoUpdateReadStatus(senderId, receiverId){

        const query = `
            UPDATE ${this._tableName}
            SET
                readStatus = 1
            WHERE
                sender_id = ? AND receiver_id = ?
        `;

        return await db.execute(query, [senderId, receiverId])
    }

    async repoUpdateMessage(messageId, message){
        const query = `
            UPDATE ${this._tableName}
            SET
                sender_id = ?, 
                receiver_id = ?,
                message = ?, 
                readStatus = 1
            WHERE 
                id = ?
        `;
    }

    async repoDeleteMessage(messageId){

    }
}

const initMessageRepository = () => {
    return new MessageRepository();
}

module.exports = initMessageRepository;
