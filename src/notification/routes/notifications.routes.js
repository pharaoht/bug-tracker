const express = require('express');

const verifyJWTlogin = require('../../middleware/jwt.middleware');

const { httpGetNotificationsByUserId } = require('../controller/notifications.controller');

const notificationRouter = express.Router();

const resource = '/notifications';

notificationRouter.get(`${resource}/user/:id`, verifyJWTlogin, httpGetNotificationsByUserId);

module.exports = notificationRouter;
