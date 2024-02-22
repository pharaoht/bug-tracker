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

    const { email, givenName, familyName } = req.query;

    let isExist = null;

    try{

        isExist = await User.modelCheckIfUserExist(email);

    }
    catch(err){
        console.log(err);
        return res.status(400).json({'error': 'Something went wrong'})

    }

    if(isExist[0][0].emailExists === 0){

        const newUser = new User(email, givenName, familyName);

        try {
            
            await newUser.modelCreateUser();

        } catch (err) {
            
            console.log(err);
            return res.status(400).json({'error': 'Something went wrong'})
        }

    }

    return res.redirect(`/api/users/${email}`);

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