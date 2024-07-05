const moment = require('moment');

class MessageDataAccessLayer {

    constructor(){
        this.id = 'id';
        this.senderId = 'sender_id';
        this.receiverId = 'receiver_id';
        this.message = 'message';
        this.createdAt = 'createdAt';
        this.updatedAt = 'updatedAt';
        this.readStatus = 'readStatus';
        this.senderFirstName = 'sender_firstName';
        this.senderLastName = 'sender_lastName';
        this.senderImageUrl = 'sender_imageUrl';
        this.receiverFirstName = 'receiver_firstName';
        this.receiverLastName = 'receiver_lastName';
        this.receiverImageUrl = 'receiver_imageUrl';
    }

    fromDto(){

    }

    toDto( data ){

        const messageData = data.slice(0,1).flat();

        const dto = messageData.map((itm, idx) => {

            const readStatus = Number(itm[this.readStatus]) === 0 ? false : true;

            return {
                id: itm[this.id],
                messageText: itm[this.message],
                isRead: readStatus,
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YYYY'),
                senderId: itm[this.senderId],
                senderName: `${itm[this.senderFirstName]} ${itm[this.senderLastName]}`,
                senderImageUrl: itm[this.senderImageUrl],
                receiverId: itm[this.receiverId],
                receiverName: `${itm[this.receiverFirstName]} ${itm[this.receiverLastName]}`,
                receiverImageUrl: itm[this.receiverImageUrl],
            }
        });

        return dto;
    };
};

const initMessageDal = () => {
    return new MessageDataAccessLayer();
}

module.exports = initMessageDal;