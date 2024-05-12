function isLoginMiddleware(req, res, next){

    const isLoggin = req.session.passport || false;

    if(isLoggin) next();
    
    else res.status(401).json({'error': 'You must be logged in'});
    
};


module.exports = isLoginMiddleware;