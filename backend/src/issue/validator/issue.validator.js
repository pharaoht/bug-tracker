module.exports = class IssueValidator{

    static validateInputString( body ) {

        if(body == {}) throw new Error('Input must be a string');
        
        for (const [key, value] of Object.entries(body)) {
            
            if (typeof value !== 'string') {
                throw new Error('Input must be a string');
            }
    
            if (value === null || value === undefined || value === '')  {
                throw new Error('Input must not be null or undefined');
            }
    
        }

        return true;
    }

    static userValidate(){

    }

};