module.exports = class UserRepository{

    repoCreateUser( userModel ){
        
        const { email } = userModel;

        const query = ` 
            INSERT INTO issue (email) 
            VALUES (?)
        `;

        return db.execute(query, [email]);
    }
}