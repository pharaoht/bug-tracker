const express = require('express');

const { httpCreateUser, httpGetAllUsers, httpGetUserById, httpUploadUserImage } = require('../controller/user.controller');

const isLoginMiddlware = require('../../middleware/login.middleware');

const verifyJWTCookie = require('../../middleware/jwt.middleware');

const multerUpload = require('../../middleware/multer.middleware');

const userRouter = express.Router();

const resource = '/users';

userRouter.get(`${resource}`, httpGetAllUsers);

userRouter.get(`${resource}/new`, isLoginMiddlware, httpCreateUser);

userRouter.get(`${resource}/id`, verifyJWTCookie, httpGetUserById);

userRouter.post(`${resource}/upload`, verifyJWTCookie, multerUpload, httpUploadUserImage)

module.exports = userRouter;