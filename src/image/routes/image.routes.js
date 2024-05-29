const express = require('express');

const { httpGetImagesByIssueId } = require('../controller/image.controller');

const issueImagesRouter = express.Router();

const resource = '/images/issue';

issueImagesRouter.get(`${resource}/:id`, httpGetImagesByIssueId );