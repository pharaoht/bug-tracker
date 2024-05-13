function isLoginMiddleware(req, res, next){

    const isLoggin = req.isAuthenticated() && req.user;
    console.log(req.session, isLoggin)
    if(isLoggin) next();
    
    else res.status(401).json({'error': 'You must be logged in'});
    
};


module.exports = isLoginMiddleware;