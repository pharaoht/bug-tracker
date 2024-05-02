const UserRepository = require("../repository/user.repository");

module.exports = class User extends UserRepository {

    constructor(email, givenName, familyName){
        super();
        this.email = email;
        this.givenName = givenName;
        this.familyName = familyName;
    }

    modelCreateUser(){

        const userModel = {
            email: this.email,
            givenName: this.givenName,
            familyName: this.familyName,
        };

        return this.repoCreateUser(userModel);

    }

    static modelCheckIfUserExist( email ){
        return UserRepository.repoCheckIfUserExist(email);
    }

    static modelGetUserByEmail( email ){
        return UserRepository.repoGetUserByEmail(email);
    }

    static modelGetAllUsers( userObj ){

        const { skip, limit } = userObj;

        return UserRepository.repoGetAllUsers(skip, limit)
    }
};