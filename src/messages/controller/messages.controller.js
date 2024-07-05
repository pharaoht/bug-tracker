const initMessageDal = require("../dal/messages.dal");
const initMessageRepository = require("../repository/messages.respository");

async function httpGetMessagesByReceiverId(req, res){

    try{

        const senderId = req.params.senderId;

        const receiverId = req.params.receiverId;

        const messageRepository = initMessageRepository();

        const messageDal = initMessageDal();

        const result = messageRepository.repoGetMessagesByReceiverId(senderId, receiverId);

        const dto = messageDal.toDto(result);

        return res.status(200).json(dto);

    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(400).json({'error': error.message});
    }
};

async function httpPostCreateNewMessage(req, res){

}

async function httpGetSearchMessages(req, res){

}

module.exports = {
    httpGetMessagesByReceiverId,
    httpGetSearchMessages,
    httpPostCreateNewMessage
}

