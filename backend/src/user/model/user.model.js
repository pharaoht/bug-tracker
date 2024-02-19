const UserRepository = require("../repository/user.repository");

module.exports = class User extends UserRepository {

    constructor(email){
        super();
        this.email = email;
    }

    createUser(){

    }
};