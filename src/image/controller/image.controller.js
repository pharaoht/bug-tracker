const ImageRepository = require('../../image/repository/image.repository');
const issueImageDal = require('../dal/image.dto');

async function httpGetImagesByIssueId(req, res){

    const issueId = req.params.id;

    try {

        const imageRepository = new ImageRepository();

        const result = await imageRepository.repoGetImage(issueId);

        const dto = issueImageDal.toDto(result);

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