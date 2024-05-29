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

        const result = await db.execute(query, [ issueId ]);

        return result[0][0].image_url
    }

    async repoDeleteImage( ){
        const query = `
            DELETE FROM ${this._tableName}
            WHERE 
        `
    }
}