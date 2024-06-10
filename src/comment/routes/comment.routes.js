const express = require('express');

const verifyJWTlogin = require('../../middleware/jwt.middleware');

const { httpGetCommentsByIssueId, httpCreateCommentToIssue, httpUpdateCommentToIssue, httpDeleteCommentToIssue } = require('../controller/comment.controller');

const commentRouter = express.Router();

const resource = '/comments';

commentRouter.get(`${resource}/:id`, httpGetCommentsByIssueId);

commentRouter.post(`${resource}/new`, verifyJWTlogin, httpCreateCommentToIssue);

commentRouter.put(`${resource}/:id`, verifyJWTlogin, httpUpdateCommentToIssue);

commentRouter.delete(`${resource}/:id`, verifyJWTlogin, httpDeleteCommentToIssue); 

module.exports = commentRouter;