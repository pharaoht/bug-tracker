const express = require('express');

const verifyJWTlogin = require('../../middleware/jwt.middleware');

const { httpGetNotificationsByUserId, httpUpdateNotification, httpDeleteNotification } = require('../controller/notifications.controller');

const notificationRouter = express.Router();

const resource = '/notifications';

notificationRouter.get(`${resource}/user/:id`, verifyJWTlogin, httpGetNotificationsByUserId);

notificationRouter.put(`${resource}/:id`, verifyJWTlogin, httpUpdateNotification);

notificationRouter.delete(`${resource}/:id`, verifyJWTlogin, httpDeleteNotification);

module.exports = notificationRouter;
