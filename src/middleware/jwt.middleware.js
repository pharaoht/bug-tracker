const jwt = require('jsonwebtoken');

const verifyJWTlogin = (req, res, next) => {

    const token = req.headers.authorization;

    try{

        const user = jwt.verify(token, process.env.COOKIE_KEY_ONE);

        req.user = user;

        next();
    }
    catch(error){

        console.log('user session expired');

        res.clearCookie('token');

        return res.status(401).json({error: 'session expired'});
    }
};


module.exports = verifyJWTlogin;