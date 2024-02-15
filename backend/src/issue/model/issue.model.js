const { repoCreateIssue, repoGetAllIsues, } = require('../repository/issue.repository');

module.exports = class Issue{

    constructor(title, description,){
        this.title = title;
        this.description = description;
    }

    modelCreateIssue(){

        const issueDataObj = {
            title: this.title,
            description: this.description
        };

        return repoCreateIssue(issueDataObj);
    }

    static modelUpdateIssue(id){ };

    static modelArchiveIssue(id) { };

    static modelGetAllIssues() { 

        return repoGetAllIsues();
    };

    static modelGetIssue(id) { };

    static searchIssue() { };

}


// Issue Model
// Title
// Description
// Status
// Created At
// Updated At