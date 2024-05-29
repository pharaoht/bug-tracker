const db = require('../../database/db.connection');

module.exports = class ImageRepository {

    constructor(){
        this._tableName = 'images'
    }

    async repoCreateImage( issueId, imageUrl ){

        const query = `
            INSERT INTO ${this._tableName} (issue_id, image_url)
            VALUES (?,?)
        `

        return await db.execute(query, [issueId, imageUrl]);
    };

    async repoGetImage( issueId ){

        const query = `
            SELECT *
            FROM ${this._tableName}
            WHERE issue_id = ?
        `;

        return await db.execute(query, [ issueId ]);
    }

    async repoDeleteImage( ){
        const query = `
            DELETE FROM ${this._tableName}
            WHERE 
        `
    }
}