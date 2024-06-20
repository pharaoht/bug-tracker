const NotificationDataAccessLayer = require("../dal/notification.dal");
const NotificationRepository = require("../repository/notification.repository");

async function httpGetNotificationsByUserId(req, res){

    try{

        const userId = req.params.id;

        const notificationRepository = new NotificationRepository();

        const notificationDal = new NotificationDataAccessLayer();

        const results = await notificationRepository.repoGetNotificationsByUserId(userId);

        const dto = notificationDal.toDto(results);

        res.status(200).json(dto);

    }
    catch(error){

        console.log(error.messsage)

        res.status(400).json({ 'error': error.messsage || 'Internal server error'})
    }
}

module.exports = {
    httpGetNotificationsByUserId
}