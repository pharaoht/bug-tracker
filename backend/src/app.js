const express = require('express');

const cors = require('cors');

require('./middleware/passport.middleware');

const passport = require('passport');

//Middleware
const setUpCookieMiddleware = require('./middleware/cookie.middleware');

const isLoginMiddlware = require('./middleware/login.middleware');

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

app.use(authRouter);

app.use(issueRouter);

app.use(userRouter);

module.exports = app;