const User = require('../model/user.model');
const userDal = require('../dal/user.dal');
const jwt = require('jsonwebtoken');

async function httpGetAllUsers(req, res){

    const { skip, limit } = req.query;

    const userObj = {
        skip: skip,
        limit: limit
    }

    const results = await User.modelGetAllUsers(userObj);

    const dto = userDal.toDto(results);

    return res.status(200).json(dto);


};

async function httpCreateUser(req, res, next){

    const { email, given_name, family_name } = req.session.passport.user;

    let isExist = null; 

    let user = {};

    if(!email || !given_name || !family_name){

       return res.status(400).json({ 'error': 'Please go to your Google account to fill in your name information. We need it to id you'})
    } 

    try{

        isExist = await User.modelCheckIfUserExist(email);

    }
    catch(error){
        console.log(error);
        return res.status(400).json({'error': error.message || 'Something went wrong with verifying your email'})

    }

    if(isExist[0][0].emailExists === 0){

        const newUser = new User(email, given_name, family_name);
        
        try {
            
            user = await newUser.modelCreateUser();

        } catch (error) {
            
            console.log(error);
            return res.status(400).json({'error': 'Something went wrong with trying to create your account'})
        }

    }
    else{

        try{

            user = await User.modelGetUserByEmail(email);
        }
        catch(error){
            console.log(error);
            return res.status(400).json({'error': error.message || 'Something went wrong'})
        }

    }


    const dto = userDal.toDto(user);

    const token = jwt.sign(dto[0], process.env.COOKIE_KEY_ONE, { expiresIn: '1h'});

    return res.redirect(`${req.session.referrer}?token=${token}`);

};

async function httpGetUserById(req, res){

    const user = req.user;

    try {
        
        const results = await User.modelGetUserById(user.id);

        //dal
        const dto = userDal.toDto(results);

        return res.status(200).json(dto);
        
    } catch (error) {

        console.log(error);
        return res.status(400).json({error: error.message})
    }

};

module.exports = {
    httpGetAllUsers,
    httpCreateUser,
    httpGetUserById
}