const db = require('../../database/db.connection');

class CommentRepository {

    constructor(){

        this._tableName = 'comments'
        this._columns = `
        	comments.id as comment_id,
			commentText,
            comments.createdAt as commentCreatedAt,
            comments.updatedAt as commentUpdatedAt,
            users.id as user_id,
            users.firstName as firstName,
            users.lastName as lastName,
            imageUrl,
            teams.name as teamName,
            teams.id as team_id
        `
    };

    async repoCreateNewCommentToIssue(commentText, userId, issueId){

        const query = `
            INSERT INTO comments( commentText, issue_id, user_id)
            VALUES (?,?,?)
        `;

        return await db.execute(query, [commentText, issueId, userId]);
    }

    async repoGetCommentsByIssueId(id){

        const query = `
            SELECT ${this._columns}
            FROM ${this._tableName}
            JOIN users ON comments.user_id = users.id
            JOIN teams ON users.team_id = teams.id
            WHERE issue_id = ?
            ORDER BY comments.createdAt DESC
        `;

        return await db.execute(query, [id]);
    }

    async repoDeleteCommentById(id){

        const queryDelete = `
            DELETE FROM ${this._tableName}
            WHERE id = ?;
        `;

        return await db.execute(queryDelete, [id]);

    }
};

const initCommentRepository = () => {
    return new CommentRepository()
}


module.exports = {
    initCommentRepository
};