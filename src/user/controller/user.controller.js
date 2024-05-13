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

async function httpCreateUser(req, res){

    const { email, given_name, family_name } = req.session.passport.user;

    let isExist = null; 

    let user = {};

    if(!email){

        const error = new Error('no email was provided');
        next(error)
    } 

    try{

        isExist = await User.modelCheckIfUserExist(email);

    }
    catch(error){
        console.log(error);
        return res.status(400).json({'error': 'Something went wrong'})

    }

    if(isExist[0][0].emailExists === 0){

        const newUser = new User(email, given_name, family_name);
        
        try {
            
            user = await newUser.modelCreateUser();

        } catch (error) {
            
            console.log(error);
            return res.status(400).json({'error': 'Something went wrong'})
        }

    }
    else{

        try{

            user = await User.modelGetUserByEmail(email);
        }
        catch(error){
            console.log(error);
            return res.status(400).json({'error': 'Something went wrong'})
        }

    }

    const dto = userDal.toDto(user);

    const token = jwt.sign(dto[0], process.env.COOKIE_KEY_ONE, { expiresIn: '1h'});

    return res.redirect(`${req.session.referrer}?token=${token}`);

};

async function httpGetUserByEmail(req, res){

    const user = req.session.passport.user;
  
    try {
        
        const results = await User.modelGetUserByEmail(user.email);

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
    httpGetUserByEmail
}