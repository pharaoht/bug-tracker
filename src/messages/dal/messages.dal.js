const moment = require('moment');
const { capitalizeFirstLetter } = require('../../util');

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
        this.otherUserId = 'otherUser_id'
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
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YY HH:mm'),
                senderId: isSenderPresent ? itm[this.senderId] : null,
                senderName: isSenderPresent ? `${capitalizeFirstLetter(itm[this.senderFirstName])} ${capitalizeFirstLetter(itm[this.senderLastName])}` : null,
                senderImageUrl: isSenderPresent ? itm[this.senderImageUrl] : null,
                receiverId: itm[this.receiverId] || itm[this.otherUserId],
                receiverName: `${capitalizeFirstLetter(itm[this.receiverFirstName])} ${capitalizeFirstLetter(itm[this.receiverLastName])}`,
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