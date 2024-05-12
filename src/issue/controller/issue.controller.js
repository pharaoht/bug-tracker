const issueModel = require('../model/issue.model');
const issueValidator = require('../validator/issue.validator');
const issueDal = require('../dal/issue.dal');

async function httpGetAllIssues(req, res) {

    const { skip, limit } = req.query;

    const issueObj = {
        skip: skip,
        limit: limit
    }

    try{
        const results = await issueModel.modelGetAllIssues(issueObj);

        const dto = issueDal.toDto(results);
  
        return res.status(200).json(dto);
    }
    catch(err){
        console.log(err)
        return res.status(400).json({error:'something went wrong'})
    }


};

async function httpCreateNewIssue(req, res) {

    const body = req.body;

    try{

        issueValidator.validateInputString(body);

        const { title, description, userId } = body;

        await issueModel.modelCreateIssue(title, description, userId);

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
        
        const results = await issueModel.modelGetOneIssue(issueId);

        const dto = issueDal.toDto(results);

        return res.status(200).json(dto);

    } catch (err) {
        
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
        description: body.description,
        status: body.status
    };

    try {
        
        await issueModel.modelUpdateIssue(issueData);

        return res.status(204)

    } catch (error) {
        
        console.log(`Error: ${err.message}`);

        return res.status(404).json({'error': err.message});

    }
}

async function httpArchiveIssue(req, res){

    const issueId = req.params.id;

    try {
        
        await issueModel.modelArchiveIssue(issueId);

        return res.status(204)

    } catch (error) {
        
        console.log(`Error: ${err.message}`);

        return res.status(404).json({'error': err.message});

    }
}

async function httpSearchIssues(req, res){

    if(Object.keys(req.query).length === 0){
        return res.status(400).json({ error:'Please provide a search term'})
    }

    try{

        const { searchTerm } = req.query;
       
        const results = await issueModel.modelSearchIssues(searchTerm);

        const dto = issueDal.toDto(results);

        return res.status(200).json(dto);
        
    }
    catch(error){
        console.log(error)
        return res.status(400).json({ error:'Something went wrong'})
    }

}

async function httpGetIssuesByPriority(req, res){

    const priorityType = req.params.type;

    if(!priorityType){
        return res.status(400).json({ error: 'Please provide a priority type identifier in your request' });
    };

    const upperCaseStr = priorityType.toUpperCase();

    try {

        const results = await issueModel.modelGetIssueByPriority(upperCaseStr);
        
        const dto = issueDal.toDto(results);

        return res.status(200).json(dto);
    }
    catch(error){

        console.log('error', error.message)
        return res.status(400).json({ error: error.message })
    }

};

async function httpSortIssues(req, res){

    try{

    }
    catch(error){

    }
};

async function httpGetIssuesByUserId(req, res){

    const userId = req.params.id;

    try{

    }
    catch(error){

    }
}


module.exports = {
    httpGetAllIssues,
    httpCreateNewIssue,
    httpGetOneIssue,
    httpUpdateIssue,
    httpArchiveIssue,
    httpSearchIssues,
    httpSortIssues,
    httpGetIssuesByUserId,
    httpGetIssuesByPriority
}