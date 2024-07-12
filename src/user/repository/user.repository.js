const db = require('../../database/db.connection');

module.exports = class UserRepository{

    constructor(){
        this.tableName = 'users'
    }

    repoCreateUser( userModel ){
        
        const { email, givenName, familyName } = userModel;

        const query = ` 
            INSERT INTO ${this.tableName} (email, firstName, lastName, team_id) 
            VALUES (?, ?, ?, 1)
        `;

        return db.execute(query, [ email, givenName, familyName ]);
    }

    static repoCheckIfUserExist( email ){

        const query = `
            SELECT COUNT(*) AS emailExists
            FROM users
            WHERE email = ?

        `;

        return db.execute(query, [ email ]);
    }

    static repoGetUserByEmail(email){

        const query = `
            SELECT 
				users.id,
                email,
                firstName, 
                lastName, 
                users.createdAt,
                isAdmin,
                imageUrl,
                teams.id as team_id,
                teams.name as teamName
            FROM issue_tracker.users
            JOIN issue_tracker.teams ON users.team_id = teams.id
            WHERE email = ?
        `;

        return db.execute(query, [ email ]);
    };

    static repoGetUserById( id ){

        const query = `
            SELECT 
				users.id,
                email,
                firstName, 
                lastName, 
                users.createdAt,
                isAdmin,
                imageUrl,
                teams.id as team_id,
                teams.name as teamName
            FROM issue_tracker.users
            JOIN issue_tracker.teams ON users.team_id = teams.id
            WHERE users.id = ?
        `;

        return db.execute(query, [ id ]);
    }

    static repoGetAllUsers(skip, limit){

        const pageSkip = Math.abs(skip) || 1;

        const pageLimit = Math.abs(limit) || 10;

        const query = `
            WITH PagedUsers AS (
                SELECT 
                    u.*,
                    t.name AS teamName,
                    ROW_NUMBER() OVER (ORDER BY u.createdAt DESC) AS rowNum,
                    COUNT(*) OVER () AS totalCount
                FROM users u
                LEFT JOIN teams t ON u.team_id = t.id
            )
            SELECT 
                *,
                CEIL(CAST(RowNum AS DECIMAL) / ?) AS currentPage,
                CEIL(CAST(TotalCount AS DECIMAL) / ?) AS totalPages
            FROM PagedUsers
            WHERE RowNum BETWEEN ? AND ?;
        `;

        return db.execute(query, [ pageLimit, pageLimit, pageSkip, pageLimit ]);
    }
}