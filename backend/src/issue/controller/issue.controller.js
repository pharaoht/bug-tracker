const IssueModel = require('../model/issue.model');
const issueValidator = require('../validator/issue.validator');
const issueDal = require('../dal/issue.dal');

async function httpGetAllIssues(req, res) {

    const results = await IssueModel.modelGetAllIssues();

    const dto = issueDal.toDto(results);

    return res.status(200).json({ data: dto });
};

async function httpCreateNewIssue(req, res) {

    const body = req.body;

    try{

        issueValidator.validateInputString(body);

    }
    catch(err){

        console.log(`Error: ${err.message}`);

        return res.status(400).json({'error': err.message});

    }

    const { title, description } = body;

    const issue = new IssueModel(title, description);

    try{

        await issue.modelCreateIssue();

        return res.status(201);

    }
    catch(err){

        console.log(`Error: ${err.message}`);

        return res.status(400).json({'error': err.message});

    }

};

async function httpGetOneIssue(req, res, next){

    const issueId = req.params.id;
    
    try {
        
        const results = await IssueModel.modelGetOneIssue(issueId);

        const dto = issueDal.toDto(results);

        return res.status(200).json({ data: dto });

    } catch (error) {
        
        console.log(`Error: ${err.message}`);

        return res.status(404).json({'error': err.message});

    }

    
};

async function httpUpdateIssue(req, res){

    const issueId = req.params.id;

    const body = req.body;

    try{

        issueValidator.validateInputString(body);

    }
    catch(err){

        console.log(`Error: ${err.message}`);

        return res.status(400).json({'error': err.message});

    }

    const issueData = {
        id: issueId,
        title: body.title,
        description: body.description
    };

    try {
        
        await IssueModel.modelUpdateIssue(issueData);

        return res.status(204)

    } catch (error) {
        
        console.log(`Error: ${err.message}`);

        return res.status(404).json({'error': err.message});

    }
}

async function httpArchiveIssue(req, res){

    const issueId = req.params.id;

    try {
        
        await IssueModel.modelArchiveIssue(issueId);

        return res.status(204)

    } catch (error) {
        
        console.log(`Error: ${err.message}`);

        return res.status(404).json({'error': err.message});

    }
}


module.exports = {
    httpGetAllIssues,
    httpCreateNewIssue,
    httpGetOneIssue,
    httpUpdateIssue,
    httpArchiveIssue
}