const db = require('../../database/db.connection');

module.exports = class IssueRepository{

    constructor(){
        this._tableName = 'issue';
        this._archiveTableName = 'issue_archive'
        this._columns = `
            issue.id as issue_id,
            title,
            description,
            status,
            priority,
            issue.createdAt,
            users.id as user_id,
            users.firstName as firstName,
            users.lastName as lastName,
            imageUrl,
            teams.name as teamName,
            teams.id as team_id
        `
    }
    
    async repoCreateIssue( issueDataModel ) {

        const { title, description, userId, status, priority, teamId } = issueDataModel;

        const query = ` 
            INSERT INTO issue (title, description, status, user_id, priority, team_id) 
            VALUES (?,?,?,?,?,?)
        `;

        const result = await db.execute(query, [title, description, status, userId, priority, teamId]);

        return result[0].insertId;
    }

    repoGetAllIsues( issueObj ) {

        const { offset, limit } = issueObj;

        const pageSkip = Math.abs(offset) + 1 || 0;

        const pageLimit = Math.abs(limit) || 10;

        const query = `
                WITH PagedIssues AS (
                SELECT 
                    ${this._columns},
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
                CEIL(CAST(TotalCount AS DECIMAL) / ?) AS totalPages,
                totalCount
                FROM PagedIssues
                WHERE RowNum BETWEEN ? AND CAST(TotalCount AS DECIMAL);
        `;

        return db.execute(query, [ pageLimit, pageLimit, pageSkip, ]);
    }

    repoGetOneIssue( issueId ){

        const id = issueId;

        const query = `
            SELECT 
                ${this._columns}
            FROM issue
            JOIN users on issue.user_id = users.id
            JOIN teams on issue.team_id = teams.id
            WHERE issue.id = ?
        `;

        return db.execute(query, [id]);
    }

    repoUpdateIssue( issueBody ){

        const { id, title, description, status, priority } = issueBody;

        const query = `
            UPDATE issue
            SET
                title = ?,
                description = ?,
                status = ?,
                priority = ?
            WHERE
                id = ?
        `;

        return db.execute(query, [title, description, status, priority, id]);
    }

    repoSearchIssues( searchTerm, limit, offset ){

        const query = `
            WITH PagedIssues AS (
                SELECT 
                    ${this._columns},
                    ROW_NUMBER() OVER (ORDER BY issue.createdAt DESC) AS rowNum,
                    COUNT(*) OVER () AS totalCount
                FROM ${this._tableName}
                JOIN users ON issue.user_id = users.id
                JOIN teams ON issue.team_id = teams.id
                WHERE CONCAT(title, ' ', description, ' ', users.firstName, ' ', users.lastName) LIKE ?
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
            CEIL(CAST(TotalCount AS DECIMAL) / ?) AS totalPages,
            totalCount
            FROM PagedIssues
            WHERE RowNum BETWEEN ? AND CAST(TotalCount AS DECIMAL);`

        const searchTermWithWildcards = '%' + searchTerm + '%';

        return db.execute(query, [searchTermWithWildcards, limit, limit, offset])
    }

    repoGetIssueByPriority( type ){

        const query = `
            SELECT 
                ${this._columns}
            FROM ${this._tableName}
            JOIN teams on issue.team_id = teams.id
            JOIN users on issue.user_id = users.id 
            WHERE priority = ?
        `;

        return db.execute(query, [type])
    }

    repoGetIssuesByStatus( type ){
        const query = `
            SELECT 
                ${this._columns}
            FROM ${this._tableName}
            JOIN teams on issue.team_id = teams.id
            JOIN users on issue.user_id = users.id 
            WHERE status = ?
        `;

        return db.execute(query, [type])
    }

    repoGetSortIssues( columnToBeSort, sortDirection, limit, offset ){

        const allowedColumns = ['firstName', 'createdAt', 'title', 'status', 'priority']; 
        const allowedDirections = ['ASC', 'DESC'];

        if (!allowedColumns.includes(columnToBeSort)) {
            throw new Error('Invalid column name');
        }

        if (!allowedDirections.includes(sortDirection.toUpperCase())) {
            throw new Error('Invalid sort direction');
        }

        const query = `
            SELECT 
                ${this._columns},
                ROW_NUMBER() OVER (ORDER BY issue.createdAt DESC) AS rowNum,
                COUNT(*) OVER () AS totalCount
            FROM ${this._tableName}
            JOIN teams on issue.team_id = teams.id
            JOIN users on issue.user_id = users.id
            ORDER BY ${columnToBeSort} ${sortDirection}
            LIMIT ?
            OFFSET ?
        `;

        return db.execute(query, [limit, offset]);

    }

    async repoArchiveIssue( id ){

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const queryInsert = `
                INSERT INTO ${this._archiveTableName} (id, title, description, status, priority, createdAt, updatedAt, user_id, team_id)
                SELECT id, title, description, status, priority, createdAt, updatedAt, user_id, team_id
                FROM ${this._tableName}
                WHERE id = ?;
            `;

            const queryDelete = `
                DELETE FROM ${this._tableName}
                WHERE id = ?;
            `;

            await connection.query(queryInsert, [id]);

            await connection.query(queryDelete, [id]);

            await connection.commit();

            return true;
        } 
        catch (error) {

            await connection.rollback();

            throw error;
        } 
        finally {
            connection.release();
        }

    }
}