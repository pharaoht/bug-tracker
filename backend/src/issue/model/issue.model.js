const IssueRepository = require('../repository/issue.repository');

class Issue extends IssueRepository{

    constructor(title, description,){
        super();
        this.title = title;
        this.description = description;
    }

    modelCreateIssue(title, description){
        const issueData = {
            title: title,
            description: description
        }
        return this.repoCreateIssue(issueData);
    }

    modelUpdateIssue( issueBody ){ 

        return this.repoUpdateIssue(issueBody);
    };

    
    modelGetAllIssues( issueObj ) { 
        
        return this.repoGetAllIsues( issueObj);
    };
    
    modelGetOneIssue(id) { 
        
        return this.repoGetOneIssue(id);
    };
    
    modelArchiveIssue(id) { };
    searchIssue() { };

};


const issueModel = new Issue();
module.exports = issueModel;


// Issue Model
// Title
// Description
// Status
// Created At
// Updated At