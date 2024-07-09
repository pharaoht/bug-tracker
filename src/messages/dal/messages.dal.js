const moment = require('moment');

const IMAGEDOMAIN = process.env.IMAGE_CLOUD_DOMAIN;

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

            const isSenderPresent = itm[this.senderId] ? true : false;

            const receiverImage = itm[this.receiverImageUrl] && IMAGEDOMAIN + itm[this.receiverImageUrl];

            return {
                id: itm[this.id],
                messageText: itm[this.message],
                isRead: readStatus,
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YYYY HH:MM'),
                senderId: isSenderPresent ? itm[this.senderId] : null,
                senderName: isSenderPresent ? `${itm[this.senderFirstName]} ${itm[this.senderLastName]}` : null,
                senderImageUrl: isSenderPresent ? itm[this.senderImageUrl] : null,
                receiverId: itm[this.receiverId],
                receiverName: `${itm[this.receiverFirstName]} ${itm[this.receiverLastName]}`,
                receiverImageUrl: receiverImage,
            }
        });

        return dto;
    };
};

const initMessageDal = () => {
    return new MessageDataAccessLayer();
}

module.exports = initMessageDal;