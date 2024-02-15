const db = require('../../database/db.connection');

module.exports = class IssueRepository{
    
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
}