const moment = require('moment');
const { capitalizeFirstLetter } = require('../../util/index');

class IssueDataAccessLayer {

    constructor(){
        this.id = 'id'
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
    }

    toDto( data ){

        const issueData = data.slice(0,1).flat();

        const dto = issueData.map((itm, idx) => {

            return {
                id: itm[this.id],
                title: itm[this.title],
                description: itm[this.description],
                status: itm[this.status],
                priority: itm[this.priority],
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YYYY'),
                team: itm[this.teamName],
                teamId: itm[this.teamId],
                userId: itm[this.userId],
                createdBy: `${capitalizeFirstLetter(itm[this.firstName])}, ${capitalizeFirstLetter(itm[this.lastName])}`,
            }

        });

        return dto;

    };

    fromDto ( data ){
    }
};

const issueDal = new IssueDataAccessLayer();

module.exports = issueDal;