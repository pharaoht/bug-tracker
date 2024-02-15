const express = require('express');

const cors = require('cors');

const issueRouter = require('./issue/routes/issue.routes');

const app = express();

app.use(cors({ origin: '*', }));

app.use(express.json());

app.use(issueRouter);

module.exports = app;