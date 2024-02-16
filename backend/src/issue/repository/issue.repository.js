const db = require('../../database/db.connection');

module.exports = class IssueRepository{

    constructor(){
        this._tableName = 'issue';
    }
    
    static repoCreateIssue( issueDataModel ) {

        const { title, description } = issueDataModel;

        const query = ` 
            INSERT INTO issue (title, description, status) 
            VALUES (?,?,'OPEN')
        `;

        return db.execute(query, [title, description])
    }

    static repoGetAllIsues() {

        const query = `
            SELECT *
            FROM issue
        `;

        return db.execute(query);
    }

    static repoGetOneIssue( issueId ){

        const id = issueId;

        const query = `
            SELECT *
            FROM issue
            WHERE id = ?
        `;

        return db.execute(query, [id]);
    }

    static repoUpdateIssue( issueBody ){

        const { id, title, description } = issueBody;

        const query = `
            UPDATE issue
            SET
                title = ?,
                description = ?
            WHERE
                id = ?
        `;

        return db.execute(query, [title, description, id]);
    }
}