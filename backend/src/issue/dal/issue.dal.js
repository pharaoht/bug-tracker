const moment = require('moment');

class IssueDataAccessLayer {

    constructor(){
        this.id = 'id'
        this.title = 'title'
        this.description = 'description'
        this.status = 'status'
        this.createdAt = 'createdAt'
        this.updatedAt = 'updatedAt'
    }

    toDto( data ){

        const issueData = data.slice(0,1).flat();

        const dto = issueData.map((itm, idx) => {

            return {
                id: itm[this.id],
                title: itm[this.title],
                description: itm[this.description],
                status: itm[this.status],
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YYYY')
            }

        });

        return dto;

    };
};

const issueDal = new IssueDataAccessLayer();

module.exports = issueDal;