class IssueValidator{

    validateInputString( body ) {

        for (const [key, value] of Object.entries(body)) {
    
            if (value === null || value === undefined || value === '')  {
                throw new Error(` The "${key}" input is required`);
            }
    
        }

        return true;
    }

    static userValidate(){

    }

};

const issueValidator = new IssueValidator();

module.exports = issueValidator;