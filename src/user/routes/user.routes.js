const express = require('express');

const { httpCreateUser, httpGetAllUsers, httpGetUserByEmail } = require('../controller/user.controller');

const isLoginMiddlware = require('../../middleware/login.middleware');

const verifyJWTCookie = require('../../middleware/jwt.middleware');

const userRouter = express.Router();

const resource = '/users';

userRouter.get(`${resource}`, httpGetAllUsers);

userRouter.get(`${resource}/new`, isLoginMiddlware, httpCreateUser);

userRouter.get(`${resource}/email`, verifyJWTCookie, httpGetUserByEmail);

module.exports = userRouter;