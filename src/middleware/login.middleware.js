function isLoginMiddleware(req, res, next){

    console.log('***** req.session ******')
    console.log(req.session.passport.user );
    console.log('************* end')
    console.log(req.user)

    const isLoggin = req.session.passport.user || false;

    if(isLoggin) next();
    
    else res.status(401).json({'error': 'You must be logged in'});
    
};


module.exports = isLoginMiddleware;