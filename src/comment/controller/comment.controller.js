const userDal = require("../../user/dal/user.dal");
const issueDal = require("../../issue/dal/issue.dal");
const CommentDataAccessLayer = require("../dal/comment.dal");
const IssueRepository = require("../../issue/repository/issue.repository");
const UserRepository = require("../../user/repository/user.repository");
const CommentRepository = require("../respository/comment.repository");
const { createNotificationService } = require("../../services/notification/notification.services");

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

        //get user info
        const user = await UserRepository.repoGetUserById(userId)
    
        const userData = userDal.toDto(user);

        //get issue info
        const issueRepository = new IssueRepository();

        const issue = await issueRepository.repoGetOneIssue(issueId);

        const issueData = issueDal.toDto(issue); 

        //if user who comment is the owner then dont create event
        if(Number(issueData.userId) !== Number(userId)){

            const nameOfUser = userData[0].name;
            const titleOfIssue = issueData[0].title;
            const ownerOfIssue =  issueData[0].userId;

            const notificationService = createNotificationService();

            //create notification
            notificationService.createNotification(issueId, 0, nameOfUser, titleOfIssue, commentText, ownerOfIssue);
        }

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

    try{

        const commentId = req.params.id;

        const commentRepository = new CommentRepository();

        await commentRepository.repoDeleteCommentById(commentId);

        res.status(200).json({ data:'success' });

    }
    catch(error){

        console.log('Error deleting comment', error)

        console.error(error.message);

        res.status(400).json({ error: error.message || 'Internal server error'})
    }

}

module.exports = {
    httpGetCommentsByIssueId,
    httpCreateCommentToIssue,
    httpUpdateCommentToIssue,
    httpDeleteCommentToIssue
}