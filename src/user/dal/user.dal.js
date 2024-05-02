const moment = require('moment');

class UserDataAccessLayer {

    constructor(){
        this.id = 'id'
        this.firstName = 'firstName'
        this.lastName = 'lastName'
        this.email = 'email'
        this.createdAt = 'createdAt'
        this.updatedAt = 'updatedAt'
        this.isAdmin = 'isAdmin'
    }

    toDto( data ){

        const userData = data.slice(0,1).flat();

        const dto = userData.map((itm, idx) => {

            const admin = itm[this.id] === 1 ? true : false;

            return {
                id: itm[this.id],
                name: `${itm[this.firstName]} ${itm[this.lastName]}`,
                isAdmin: admin,
                createdAt: moment.utc(itm[this.createdAt]).format('MM/DD/YYYY')
            }
        });

        return dto
    };
};

const userDal = new UserDataAccessLayer();

module.exports = userDal;