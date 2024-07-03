
async function httpGetMessagesByReceiverId(req, res){

    try{

        const senderId = req.params.senderId;

        const receiverId = req.params.receiverId;
        
        //create the model for messages

        //init repo class

        //dal

        //return data

    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(400).json({'error': error.message});
    }
};

async function httpGetSearchMessages(req, res){

}

module.exports = {
    httpGetMessagesByReceiverId,
    httpGetSearchMessages
}

