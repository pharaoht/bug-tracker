
async function httpGetCommentsByIssueId(req, res){

};

async function httpCreateCommentToIssue(req, res){

    try {

        const body = req.body || false;
    
        if(body == false) {

            throw new Error('All inputs required');
        } 

        const commentText = body.comment;

        const userId = body.userId;

        const issueId = body.issueId;

        //commentRepo.Create issue

        //return success

    }
    catch(error){

        console.error('Error creating comment', error);

        res.status(400).json({ error: error.message || 'Internal server error'})
    }

};

async function httpUpdateCommentToIssue(req, res){

}

async function httpDeleteCommentToIssue(req, res){

}

module.exports = {
    httpGetCommentsByIssueId,
    httpCreateCommentToIssue,
    httpUpdateCommentToIssue,
    httpDeleteCommentToIssue
}