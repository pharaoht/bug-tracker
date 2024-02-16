const express = require('express');

const { httpGetAllIssues, httpCreateNewIssue, httpGetOneIssue, httpUpdateIssue, httpArchiveIssue } = require('../controller/issue.controller');

const issueRouter = express.Router();

const resource = 'issues';

issueRouter.get(`/${resource}`, httpGetAllIssues);

issueRouter.get(`/${resource}/:id`, httpGetOneIssue);

issueRouter.post(`/${resource}/new`, httpCreateNewIssue);

issueRouter.put(`/${resource}/:id`, httpUpdateIssue);

issueRouter.delete(`/${resource}/:id`, httpArchiveIssue);

module.exports = issueRouter;