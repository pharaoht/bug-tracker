const CommentDataAccessLayer = require("../dal/comment.dal");
const CommentRepository = require("../respository/comment.repository");

async function httpGetCommentsByIssueId(req, res){

    try {

        const issueId = req.params.id;

        if(!issueId) {

            throw new Error('No id provided')
        };

        const commentRepository = new CommentRepository();

        const results = await commentRepository.repoGetCommentsByIssueId(issueId);

        const commentDal = new CommentDataAccessLayer();
        
        const dto = commentDal.toDto(results);

        return res.status(200).json(dto);
    
    }
    catch(error){

        console.error('Error creating comment', error);

        res.status(400).json({ error: error.message || 'Internal server error'})
    }
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

        const commentRepository = new CommentRepository();

        await commentRepository.repoCreateNewCommentToIssue(commentText, userId, issueId);

        return res.status(200).json({ data: 'success' })

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