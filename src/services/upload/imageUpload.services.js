const cloudinary = require('cloudinary').v2;
require('dotenv').config();

class ImageUploadService {

    constructor(){

        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

    };

    async uploadImage( imageUrl, folder ){

        console.log('uploading image....')
    
        try {

            const uploadResult = await cloudinary.uploader.upload(
                imageUrl,
                {
                    folder: folder,
                    resource_type: 'image'
                }
            );

            console.log('**!Successful upload!**');

            return uploadResult;
           
        } catch (error) {

            console.error('Error uploading image:', error);

            throw error;
        }
    }
}

module.exports = ImageUploadService;
