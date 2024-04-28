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
    console.log(email, given_name, family_name)
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

    const userInfo = {
        email: email,
        firstName: given_name,
        lastName: family_name
    }

    return res.status(200).json({data: userInfo})

};

async function httpGetUserByEmail(req, res){

    const { email } = req.params;

    try {
        
        const results = await User.modelGetUserByEmail(email);

        //dal
        const dto = userDal.toDto(results);

        return res.status(200).json(dto)
        
    } catch (error) {

        console.log(err);
        return res.status(400).json({'error': 'Something went wrong'})
    }

};

module.exports = {
    httpGetAllUsers,
    httpCreateUser,
    httpGetUserByEmail
}