const IssueRepository = require('../repository/issue.repository');

class Issue extends IssueRepository{

    constructor(title, description, userId){
        super();
        this.title = title;
        this.description = description;
        this.userId = userId;
    }

    modelCreateIssue(title, description){
        const issueData = {
            title: title,
            description: description,
            userId: userId
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
    modelSearchIssues( issueObj ) { 
        return this.repoSearchIssues(issueObj)
    };

};


const issueModel = new Issue();
module.exports = issueModel;


// Issue Model
// Title
// Description
// Status
// Created At
// Updated At