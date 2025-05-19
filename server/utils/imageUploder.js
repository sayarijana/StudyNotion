const cloudinary = require("cloudinary").v2;

exports.uploadImgToCloudinary = async(file,folder,height,quality)=>{
    const options = {folder};
    if(height){
        options.height=height;
    }
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";

    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    }catch(err){
        throw new Error("Failed to upload image to Cloudinary: " + err.message);
    } 

}