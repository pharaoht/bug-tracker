const express = require('express');

const verifyJwtCookie = require('../../middleware/jwt.middleware');

const { httpGetMessagesByReceiverId, httpGetSearchMessages, httpPostCreateNewMessage, httpGetLatestConversations } = require('../controller/messages.controller');

const messagesRouter = express.Router();

const resource = '/messages';

messagesRouter.get(`${resource}/search`, verifyJwtCookie, httpGetSearchMessages);

messagesRouter.post(`${resource}/:senderId/:receiverId`, verifyJwtCookie, httpGetMessagesByReceiverId);

messagesRouter.post(`${resource}/create`, verifyJwtCookie, httpPostCreateNewMessage);

messagesRouter.post(`${resource}/:id`, verifyJwtCookie, httpGetLatestConversations);

module.exports = messagesRouter;