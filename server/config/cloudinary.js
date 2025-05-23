const cloudinary = require('cloudinary').v2;
const multer = require('multer');

require('dotenv').config();

    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
    } catch (error) {
        console.log(error);
    }


const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    });

    return result
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtils}