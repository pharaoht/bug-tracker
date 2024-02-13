const express = require('express');

const { httpGetAllIssues } = require('../controller/issue.controller')//controller

const issueRouter = express.Router();

issueRouter.get('/issues', httpGetAllIssues);

issueRouter.post('/issues/new', createNewIssue);

module.exports = issueRouter;