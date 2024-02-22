const passport = require('passport');

function httpOAuthLogin(req, res, next){

    passport.authenticate('google', 
        {
            scope: ['email', 'profile']
        }
    )(req, res, next);
};

async function httpOAuthCallback(req, res, next) {

    const { email, given_name, family_name} = req.user;

    passport.authenticate('google', {

        failureRedirect: '/api/auth/failure',

        successRedirect: `/api/users/new?email=${email}&givenName=${given_name}&familyName=${family_name}`,

        session: true,

    })(req, res, next);
}

async function httpLogout(req, res){

    req.logout();

    return res.redirect('/issues');
}

async function httpOAuthFailure(req, res){
    
    return res.json({'error': 'Something went wrong'})
}

module.exports = {
    httpOAuthLogin,
    httpOAuthCallback,
    httpLogout,
    httpOAuthFailure
}