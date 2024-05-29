require('dotenv').config();

const IMAGEURL = process.env.IMAGE_CLOUD_BUCKET;

class IssueImageDataAccessLayer {

    constructor(){
        this.id = 'id'
        this.issueId = 'issue_id'
        this.image = 'image_url'
    }

    toDto( data ){

        const issueImageData = data.slice(0,1).flat();

        const dto = issueImageData.map((itm, idx) => {

            const url = `${IMAGEURL}${itm[this.image]}`;
            const imageKey = `issue/${itm[this.image]}`;

            return {
                id: itm[this.id],
                issueId: itm[this.issueId],
                url: url,
                imageKey: imageKey
            }
        })

        return dto;
    }
}


const issueImageDal = new IssueImageDataAccessLayer();

module.exports = issueImageDal;