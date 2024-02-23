const db = require('../../database/db.connection');

module.exports = class IssueRepository{

    constructor(){
        this._tableName = 'issue';
    }
    
    repoCreateIssue( issueDataModel ) {

        const { title, description, userId } = issueDataModel;

        const query = ` 
            INSERT INTO issue (title, description, status, user_id) 
            VALUES (?,?,'OPEN',?)
        `;

        return db.execute(query, [title, description, userId])
    }

    repoGetAllIsues( issueObj ) {

        const { skip, limit } = issueObj;

        const pageSkip = Math.abs(skip) || 1;

        const pageLimit = Math.abs(limit) || 10;

        const query = `
            WITH PagedIssues AS (
            SELECT 
                *,
                ROW_NUMBER() OVER (ORDER BY createdAt DESC) AS rowNum,
                COUNT(*) OVER () AS totalCount
            FROM ${this._tableName}
            )
            SELECT 
            *,
            CEIL(CAST(RowNum AS DECIMAL) / ?) AS currentPage,
            CEIL(CAST(TotalCount AS DECIMAL) / ?) AS totalPages
            FROM PagedIssues
            WHERE RowNum BETWEEN ? AND ?;
        `;

        return db.execute(query, [ pageLimit, pageLimit, pageSkip, pageLimit ]);
    }

    repoGetOneIssue( issueId ){

        const id = issueId;

        const query = `
            SELECT *
            FROM issue
            WHERE id = ?
        `;

        return db.execute(query, [id]);
    }

    repoUpdateIssue( issueBody ){

        const { id, title, description, status } = issueBody;

        const query = `
            UPDATE issue
            SET
                title = ?,
                description = ?
                status = ?
            WHERE
                id = ?
        `;

        return db.execute(query, [title, description, status, id]);
    }
}