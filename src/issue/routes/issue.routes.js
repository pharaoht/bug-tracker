const express = require('express');

const isLoginMiddlware = require('../../middleware/login.middleware');

const { httpGetAllIssues, httpCreateNewIssue, httpGetOneIssue, httpUpdateIssue, httpArchiveIssue, httpSearchIssues, httpSortIssues, httpGetIssuesByUserId, httpGetIssuesByPriority } = require('../controller/issue.controller');

const issueRouter = express.Router();

const resource = '/issues';

issueRouter.get(`${resource}`, httpGetAllIssues);

issueRouter.get(`${resource}/search`, httpSearchIssues);

issueRouter.get(`${resource}/sort`, httpSortIssues);

issueRouter.get(`${resource}/:id`, httpGetOneIssue);

issueRouter.get(`${resource}/priority/:type`, httpGetIssuesByPriority);

issueRouter.get(`${resource}/user/:id`, httpGetIssuesByUserId);

issueRouter.post(`${resource}/new`, isLoginMiddlware, httpCreateNewIssue);

issueRouter.put(`${resource}/:id`, isLoginMiddlware, httpUpdateIssue);

issueRouter.delete(`${resource}/:id`, isLoginMiddlware, httpArchiveIssue);

module.exports = issueRouter;