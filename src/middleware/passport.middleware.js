require('dotenv').config();

const passport = require('passport');

const { Strategy } = require('passport-google-oauth2');

async function verifyCallback(accesToken, refreshToken, profile, done){

    const { email, given_name, family_name } = profile;
    done(null, profile);
};

passport.use(new Strategy(
    {
        callbackURL: '/api/auth/google/callback',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    verifyCallback
));

//save session to cookie
passport.serializeUser((user, done) => {

    done(null, user)
});

//Read the session from cookie
passport.deserializeUser((obj, done) => {

    done(null, obj)
});

