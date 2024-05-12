function isLoginMiddleware(req, res, next){

    console.log(req.session.passport.user );
    console.log('*************')
    console.log(req.user)

    const isLoggin = req.isAuthenticated() && req.session.passport.user;

    if(isLoggin) next();
    
    else res.status(401).json({'error': 'You must be logged in'});
    
};


module.exports = isLoginMiddleware;