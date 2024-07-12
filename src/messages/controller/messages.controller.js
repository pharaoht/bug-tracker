const initMessageDal = require("../dal/messages.dal");
const initMessageRepository = require("../repository/messages.respository");

async function httpGetMessagesByReceiverId(req, res){

    try{

        const senderId = req.params.senderId;

        const receiverId = req.params.receiverId;

        const messageRepository = initMessageRepository();

        const messageDal = initMessageDal();

        const result = await messageRepository.repoGetMessagesByReceiverId(senderId, receiverId);

        const dto = messageDal.toDto(result);

        return res.status(200).json(dto);

    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(400).json({'error': error.message});
    }
};

async function httpPostCreateNewMessage(req, res){

    try{
        const body = req.body;

        const { senderId, receiverId, message } = body;

        const messageRepository = initMessageRepository();

        const result = await messageRepository.repoCreateMessage(senderId, receiverId, message);
      
        //will need id from result
        //emit socket event

        return res.status(200).json({data: 'success'});
    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(400).json({'error': error.message});
    }

}

async function httpGetSearchMessages(req, res){

}

async function httpGetLatestConversations(req, res){

    try{
        const senderId = req.params.id;

        const messageRepository = initMessageRepository();

        const messageDal = initMessageDal();

        const result = await messageRepository.repoGetConversations(senderId);
        
        const dto = messageDal.toDto(result);

        return res.status(200).json(dto);

    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(400).json({'error': error.message});
    }
}

async function httpPutUpdateMessage(req, res){

    try{





    }
    catch(error){

    }
};

async function httpGetUnReadMessages(req, res){

    try{

        const receiverId = req.params.receiverId;

        const messageRepository = initMessageRepository();

        const messageDal = initMessageDal();

        const result = messageRepository.repoGetUnReadMessages(receiverId);

        const dto = messageDal.toDto(result);

        return res.status(200).result(dto)
    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(400).json({'error': error.message});
    }

}

async function httpPutUpdateReadStatus(req, res){

    try{

        const senderId = req.params.senderId;

        const receiverId = req.params.receiverId;

        const messageRepository = initMessageRepository();

        const result = await messageRepository.repoUpdateReadStatus(senderId, receiverId);

        return res.status(200).json({data: 'success'});

    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(400).json({'error': error.message});
    }
}

module.exports = {
    httpGetMessagesByReceiverId,
    httpGetSearchMessages,
    httpPostCreateNewMessage,
    httpGetLatestConversations,
    httpGetUnReadMessages,
    httpPutUpdateReadStatus
}

