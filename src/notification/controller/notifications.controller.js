const { initIssueDataAccessLayer } = require("../dal/notification.dal");
const NotificationRepository = require("../repository/notification.repository");

async function httpGetNotificationsByUserId(req, res){

    try{

        const userId = req.params.id;

        const notificationRepository = new NotificationRepository();

        const notificationDal = initIssueDataAccessLayer();

        const results = await notificationRepository.repoGetNotificationsByUserId(userId);

        const dto = notificationDal.toDto(results);

        res.status(200).json(dto);

    }
    catch(error){

        console.log(error.messsage)

        res.status(400).json({ 'error': error.messsage || 'Internal server error'})
    }
}

async function httpUpdateNotification(req, res){

    try {

        const notificationId = req.params.id;

        const notificationRepository = new NotificationRepository();

        await notificationRepository.repoUpdateNotificationToRead(notificationId);

        res.status(200).json({ data: 'success' });

    } catch (error) {

        console.log(error.messsage)

        res.status(400).json({ 'error': error.messsage || 'Internal server error'})
    }
}

async function httpDeleteNotification(req, res){

    try {

        const notificationId = req.params.id;

        const notificationRepository = new NotificationRepository();

        await notificationRepository.repoDeleteNotificationById(notificationId);

        res.status(200).json({ data: 'success' });

    } catch (error) {

        console.log(error.messsage)

        res.status(400).json({ 'error': error.messsage || 'Internal server error'})
    }
}

module.exports = {
    httpGetNotificationsByUserId,
    httpUpdateNotification,
    httpDeleteNotification
}