const express = require('express');

const isLoginMiddlware = require('../../middleware/login.middleware');

const verifyJwtCookie = require('../../middleware/jwt.middleware');

const { httpGetAllIssues, httpCreateNewIssue, httpGetOneIssue, httpUpdateIssue, httpArchiveIssue, httpSearchIssues, httpSortIssues, httpGetIssuesByUserId, httpGetIssuesByPriority, httpGetIssuesByStatus, httpExportToPdf } = require('../controller/issue.controller');

const issueRouter = express.Router();

const resource = '/issues';

issueRouter.get(`${resource}`, httpGetAllIssues);

issueRouter.get(`${resource}/search`, httpSearchIssues);

issueRouter.get(`${resource}/sort`, httpSortIssues);

issueRouter.get(`${resource}/:id`, httpGetOneIssue);

issueRouter.get(`${resource}/priority/:type`, httpGetIssuesByPriority);

issueRouter.get(`${resource}/status/:type`, httpGetIssuesByStatus);

issueRouter.get(`${resource}/user/:id`, httpGetIssuesByUserId);

issueRouter.post(`${resource}/pdf`, httpExportToPdf);

issueRouter.post(`${resource}/new`, verifyJwtCookie, httpCreateNewIssue);

issueRouter.put(`${resource}/:id`, verifyJwtCookie, httpUpdateIssue);

issueRouter.delete(`${resource}/:id`, verifyJwtCookie, httpArchiveIssue);

module.exports = issueRouter;