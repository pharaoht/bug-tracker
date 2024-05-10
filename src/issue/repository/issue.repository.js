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
                    issue.id as issue_id,
                    title,
                    description,
                    status,
                    priority,
                    issue.createdAt,
                    user_id,
                    users.id as user__id,
                    users.firstName as firstName,
                    users.lastName as lastName,
                    imageUrl,
                    teams.name as teamName,
                    teams.id as team_id,
                    ROW_NUMBER() OVER (ORDER BY issue.createdAt DESC) AS rowNum,
                    COUNT(*) OVER () AS totalCount
                FROM ${this._tableName}
                JOIN users ON issue.user_id = users.id
                JOIN teams ON issue.team_id = teams.id
                )
                SELECT 
                    issue_id,
                    title,
                    description,
                    status,
                    priority,
                    createdAt,
                    user_id,
                    firstName,
                    lastName,
                    teamName, 
                    imageUrl,
                    team_id,
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
            JOIN users on issue.user_id = users.id
            WHERE issue.id = ?
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

    repoSearchIssues( searchTerm ){

        const query = `
            SELECT *
            FROM ${this._tableName}
            WHERE CONCAT(title, ' ', description) LIKE ?;
        `;

        const searchTermWithWildcards = '%' + searchTerm + '%';

        return db.execute(query, [searchTermWithWildcards])
    }
}