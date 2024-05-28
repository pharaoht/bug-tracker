const IssueRepository = require('../repository/issue.repository');

class Issue extends IssueRepository{

    constructor(title, description, userId, status, priority, teamId){
        super();
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.status = status;
        this.priority = priority;
        this.teamId = teamId
    }

    modelCreateIssue(title, description, userId, status, priority, teamId){
        const issueData = {
            title: title,
            description: description,
            userId: userId,
            status: status,
            priority: priority,
            teamId: teamId
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
    
    modelArchiveIssue(id) { 

        return this.repoArchiveIssue(id)
    };

    modelSearchIssues( searchTerm ) { 

        return this.repoSearchIssues(searchTerm)
    };

    modelGetIssueByPriority( type ){

        return this.repoGetIssueByPriority( type )
    };

    modelGetIssuesByStatus( type ){
        return this.repoGetIssuesByStatus( type )
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