const IssueModel = require('../model/issue.model');
const IssueValidator = require('../validator/issue.validator');

async function httpGetAllIssues(req, res) {

    const results = await IssueModel.modelGetAllIssues();

    return res.status(200).json(results);
}

async function httpCreateNewIssue(req, res) {

    const body = req.body;

    try{
        const isvalid = IssueValidator.validateInputString(body);

    }
    catch(err){
        console.log(`Error: ${err.message}`)
        return res.status(400).json({'error': err.message})
    }

    const { title, description } = body;

    const issue = new IssueModel(title, description);

    try{

        const newIssue = await issue.modelCreateIssue();

        return res.status(201)

    }
    catch(err){
        console.log(`Error: ${err.message}`)
        return res.status(400).json({'error': err.message})
    }

};


module.exports = {
    httpGetAllIssues,
    httpCreateNewIssue,
}