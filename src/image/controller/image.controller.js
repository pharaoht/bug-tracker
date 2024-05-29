const ImageRepository = require('../../image/repository/image.repository');

async function httpGetImagesByIssueId(req, res){

    const issueId = req.params.id;

    try {

        const imageRepository = new ImageRepository();

        const result = imageRepository.repoGetImage(issueId);

        const dto = {};

        res.status(200).json(dto);
    }
    catch(error){

        console.log(`Error: ${error.message}`);

        return res.status(404).json({'error': error.message});
    }

};



module.exports = {
    httpGetImagesByIssueId,
}