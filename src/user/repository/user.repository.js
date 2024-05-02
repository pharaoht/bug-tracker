const db = require('../../database/db.connection');

module.exports = class UserRepository{

    constructor(){
        this.tableName = 'users'
    }

    repoCreateUser( userModel ){
        
        const { email, givenName, familyName } = userModel;

        const query = ` 
            INSERT INTO ${this.tableName} (email, firstName, lastName) 
            VALUES (?, ?, ?)
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
            SELECT *
            FROM users
            WHERE email = ?
        `;

        return db.execute(query, [ email ]);
    };

    static repoGetAllUsers(skip, limit){

        const pageSkip = Math.abs(skip) || 1;

        const pageLimit = Math.abs(limit) || 10;

        const query = `
            WITH PagedUsers AS (
            SELECT 
                *,
                ROW_NUMBER() OVER (ORDER BY createdAt DESC) AS rowNum,
                COUNT(*) OVER () AS totalCount
            FROM users
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