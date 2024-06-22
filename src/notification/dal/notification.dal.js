const moment = require('moment');

class NotificationDataAccessLayer {

    constructor(){
        this._notificationId = 'id';
        this._userId = 'user_id'
        this._issueId = 'issue_id'
        this._message = 'message'
        this._createdAt = 'createdAt'
        this._readStatus = 'readStatus'
    }

    toDto( data ){

        if(data.length == 0) return [];

        const notificationData = data.slice(0,1).flat();

        const dto = notificationData.map((itm, idx) => {

            const status = itm[this._readStatus] === 0 ? false : true;

            return {
                id: itm[this._notificationId],
                userId: itm[this._userId],
                issueId: itm[this._issueId],
                message: itm[this._message],
                createdAt: moment.utc(itm[this._createdAt]).format('MM/DD/YY HH:mm'),
                isRead: status
            }
        });

        return dto;
    }
};

const initIssueDataAccessLayer = () => {
    return new NotificationDataAccessLayer();
}

module.exports = {
    initIssueDataAccessLayer
};