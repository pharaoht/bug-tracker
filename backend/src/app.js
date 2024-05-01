const express = require('express');

const cors = require('cors');

const passport = require('passport');

//Middleware
const setUpCookieMiddleware = require('./middleware/cookie.middleware');

require('./middleware/passport.middleware');

const isLoginMiddlware = require('./middleware/login.middleware');

const errorCatchMiddleWare = require('./middleware/errorHandler.middleware');

//Routes
const authRouter = require('./auth/routes/auth.routes');

const issueRouter = require('./issue/routes/issue.routes');

const userRouter = require('./user/routes/user.routes');

const app = express();

app.use(cors({ origin: '*', }));

app.use(express.json());

app.use(setUpCookieMiddleware());

app.use(passport.initialize());

app.use(passport.session());

app.use(errorCatchMiddleWare);

const apiRouter = express.Router();

app.use('/api', apiRouter);

apiRouter.use(authRouter);

apiRouter.use(issueRouter);

apiRouter.use(userRouter);

module.exports = app;