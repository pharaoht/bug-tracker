const express = require('express');

const { httpCreateUser, httpGetAllUsers } = require('../controller/user.controller');

const isLoginMiddlware = require('../../middleware/login.middleware');

const userRouter = express.Router();

const resource = '/users';

userRouter.get(`${resource}`, httpGetAllUsers);

userRouter.post(`${resource}/new`, httpCreateUser);

module.exports = userRouter;