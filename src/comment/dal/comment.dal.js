class CommentDataAccessLayer {

    constructor(){

    }

    toDto( data ){

        const commentData = data.slice(0,1).flat();


        const dto = commentData.map((itm, idx) => {

            return {

            }
        })

        return dto;

    }

    fromDto ( data ){

    }
}