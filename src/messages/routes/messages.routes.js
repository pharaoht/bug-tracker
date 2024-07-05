const express = require('express');

const verifyJwtCookie = require('../../middleware/jwt.middleware');

const { httpGetMessagesByReceiverId, httpGetSearchMessages, httpPostCreateNewMessage } = require('../controller/messages.controller');

const messagesRouter = express.Router();

const resource = '/messages';

messagesRouter.get(`${resource}/:senderId/:receiverId`, verifyJwtCookie, httpGetMessagesByReceiverId);

messagesRouter.get(`${resource}/search`, verifyJwtCookie, httpGetSearchMessages);

messagesRouter.post(`${resource}/create`, verifyJwtCookie, httpPostCreateNewMessage);

module.exports = messagesRouter;