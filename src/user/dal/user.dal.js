const moment = require('moment');
const { capitalizeFirstLetter } = require('../../util/index');
require('dotenv').config();

const IMAGEURL = process.env.DEFAULT_PHOTO_URL;
const IMAGEDOMAIN = process.env.IMAGE_CLOUD_DOMAIN;

class UserDataAccessLayer {

    constructor(){
        this.id = 'id'
        this.firstName = 'firstName'
        this.lastName = 'lastName'
        this.email = 'email'
        this.createdAt = 'createdAt'
        this.updatedAt = 'updatedAt'
        this.isAdmin = 'isAdmin'
        this.imageUrl = 'imageUrl'
        this.teamId = 'team_id'
        this.teamName = 'teamName'
    }

    toDto( data ){

        const userData = data.slice(0,1).flat();

        const dto = userData.map((itm, idx) => {

            const admin = itm[this.isAdmin] == 1 ? true : false;
            const imageUrl = itm[this.imageUrl] == null ? IMAGEURL : `${IMAGEDOMAIN}${itm[this.imageUrl]}`;

            return {
                id: itm[this.id],
                name: `${capitalizeFirstLetter(itm[this.firstName])} ${capitalizeFirstLetter(itm[this.lastName])}`,
                isAdmin: admin,
                teamName: itm[this.teamName],
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YYYY'),
                imageUrl: imageUrl
            }
        });

        return dto
    };
};

const userDal = new UserDataAccessLayer();

module.exports = userDal;