const express = require('express');

const { httpGetAllIssues, httpCreateNewIssue } = require('../controller/issue.controller');

const issueRouter = express.Router();

issueRouter.get('/issues', httpGetAllIssues);

issueRouter.post('/issues/new', httpCreateNewIssue);

module.exports = issueRouter;