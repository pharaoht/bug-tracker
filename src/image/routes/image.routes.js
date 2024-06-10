const express = require('express');

const { httpGetImagesByIssueId } = require('../controller/image.controller');

const issueImagesRouter = express.Router();

const resource = '/images/issues';

issueImagesRouter.get(`${resource}/:id`, httpGetImagesByIssueId );

module.exports = issueImagesRouter;