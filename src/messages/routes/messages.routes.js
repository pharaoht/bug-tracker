const express = require('express');

const verifyJwtCookie = require('../../middleware/jwt.middleware');

const { httpGetMessagesByReceiverId, httpGetSearchMessages, httpPostCreateNewMessage, httpGetLatestConversations, httpGetUnReadMessages, httpPutUpdateReadStatus } = require('../controller/messages.controller');

const messagesRouter = express.Router();

const resource = '/messages';

messagesRouter.get(`${resource}/search`, verifyJwtCookie, httpGetSearchMessages);

messagesRouter.get(`${resource}/newMessages/:id`, verifyJwtCookie, httpGetUnReadMessages);

messagesRouter.get(`${resource}/:receiverId`, verifyJwtCookie, httpGetUnReadMessages);

messagesRouter.post(`${resource}/:senderId/:receiverId`, verifyJwtCookie, httpGetMessagesByReceiverId);

messagesRouter.post(`${resource}/create`, verifyJwtCookie, httpPostCreateNewMessage);

messagesRouter.post(`${resource}/:id`, verifyJwtCookie, httpGetLatestConversations);

messagesRouter.put(`${resource}/:senderId/:receiverId`, verifyJwtCookie, httpPutUpdateReadStatus);

module.exports = messagesRouter;