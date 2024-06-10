const moment = require('moment');
const { capitalizeFirstLetter } = require('../../util/index');

require('dotenv').config();

const IMAGEURL = process.env.DEFAULT_PHOTO_URL;
const IMAGEDOMAIN = process.env.IMAGE_CLOUD_DOMAIN;


class IssueDataAccessLayer {

    constructor(){
        this.id = 'issue_id'
        this.title = 'title'
        this.description = 'description'
        this.status = 'status'
        this.createdAt = 'createdAt'
        this.updatedAt = 'updatedAt'
        this.userId = 'user_id'
        this.firstName = 'firstName'
        this.lastName = 'lastName'
        this.priority = 'priority'
        this.teamName = 'teamName'
        this.teamId = 'team_id'
        this.imageUrl = 'imageUrl'
    }

    toDto( data ){

        const issueData = data.slice(0,1).flat();

        const imageUrl = IMAGEDOMAIN;

        const dto = issueData.map((itm, idx) => {

            const userImageUrl = !itm[this.imageUrl] ? IMAGEURL : imageUrl + itm[this.imageUrl] 

            return {
                id: itm[this.id],
                title: itm[this.title],
                description: itm[this.description],
                status: itm[this.status].replace(/_/, ' '),
                priority: itm[this.priority],
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YYYY'),
                team: itm[this.teamName],
                teamId: itm[this.teamId],
                userId: itm[this.userId],
                imageUrl: userImageUrl,
                createdBy: `${capitalizeFirstLetter(itm[this.firstName])}, ${capitalizeFirstLetter(itm[this.lastName])}`,
                totalCount: itm.totalCount,
                currentPage: itm.currentPage,
                totalPages: itm.totalPages
            }

        });

        return dto;

    };

    fromDto ( data ){


        const dto = Object.entries(data).reduce((acc, [key, value]) => {

            if(key == 'priority' || key == 'status'){
                acc[key] = String(value).toUpperCase();
            }
            else {
                acc[key] = value;
            }

            return acc;

        }, {});

        return dto;

    };
};

const issueDal = new IssueDataAccessLayer();

module.exports = issueDal;