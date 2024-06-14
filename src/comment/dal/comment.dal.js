const moment = require('moment');
const { capitalizeFirstLetter } = require('../../util/index');

require('dotenv').config();

const IMAGEURL = process.env.DEFAULT_PHOTO_URL;
const IMAGEDOMAIN = process.env.IMAGE_CLOUD_DOMAIN;

class CommentDataAccessLayer {

    constructor(){
        this._commentId = 'comment_id'
        this._commentText = 'commentText'
        this._createdAt = 'commentCreatedAt'
        this._updatedAt = 'commentUpdatedAt'
        this._userId = 'user_id'
        this._firstName = 'firstName'
        this._lastName = 'lastName'
        this._imageUrl = 'imageUrl'
        this._teamName = 'teamName'
        this._teamId = 'team_id'
        this._formatDate = 'MM/DD/YY HH:mm'
    }

    toDto( data ){

        if(data.length == 0) return [];

        const commentData = data.slice(0,1).flat();

        const imageUrl = IMAGEDOMAIN;

        const dto = commentData.map((itm, idx) => {

            const userImageUrl = !itm[this._imageUrl] ? IMAGEURL : imageUrl + itm[this._imageUrl] 

            return {
                id: itm[this._commentId],
                createdBy: `${ capitalizeFirstLetter(itm[this._firstName]) } ${ capitalizeFirstLetter(itm[this._lastName]) }`,
                createdAt: moment.utc(itm[this._createdAt]).format('MM/DD/YY HH:mm'),
                updatedAt: moment.utc(itm[this._updatedAt]).format('MM/DD/YY HH:mm'),
                userId: itm[this._userId],
                imageUrl: userImageUrl,
                teamName: itm[this._teamName],
                text: itm[this._commentText],
            }
        })

        return dto;

    }

    fromDto ( data ){

    }
};

module.exports = CommentDataAccessLayer;