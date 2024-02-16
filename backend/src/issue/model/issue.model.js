const IssueRepository = require('../repository/issue.repository');

module.exports = class Issue extends IssueRepository{

    constructor(title, description,){
        super();
        this.title = title;
        this.description = description;
    }

    modelCreateIssue(){

        const issueDataObj = {
            title: this.title,
            description: this.description
        };

        return this.repoCreateIssue(issueDataObj);
    }

    static modelUpdateIssue( issueBody ){ 

        return this.repoUpdateIssue(issueBody);
    };

    
    static modelGetAllIssues() { 
        
        return this.repoGetAllIsues();
    };
    
    static modelGetOneIssue(id) { 
        
        return this.repoGetOneIssue(id);
    };
    
    static modelArchiveIssue(id) { };
    static searchIssue() { };

}


// Issue Model
// Title
// Description
// Status
// Created At
// Updated At