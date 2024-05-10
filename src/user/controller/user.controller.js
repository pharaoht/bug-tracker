const User = require('../model/user.model');
const userDal = require('../dal/user.dal');

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

    if(!email){

        const error = new Error('no email was provided');
        next(error)
    } 

    try{

        isExist = await User.modelCheckIfUserExist(email);

    }
    catch(err){
        console.log(err);
        return res.status(400).json({'error': 'Something went wrong'})

    }

    if(isExist[0][0].emailExists === 0){

        const newUser = new User(email, given_name, family_name);

        try {
            
            await newUser.modelCreateUser();

        } catch (err) {
            
            console.log(err);
            return res.status(400).json({'error': 'Something went wrong'})
        }

    }

    return res.redirect(req.session.referrer);

};

async function httpGetUserByEmail(req, res){

    const user = req.session.passport.user;

    try {
        
        const results = await User.modelGetUserByEmail(user.email);

        //dal
        const dto = userDal.toDto(results);

        return res.status(200).json(dto)
        
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