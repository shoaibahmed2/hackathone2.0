const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const cloudinaryAPI = require("../config/cloudinary");
const uploadFile = async (folderName, name, localFilePath) => {
  try {
    console.log("cloudner ma req i");
    cloudinary.config({
      cloud_name: cloudinaryAPI.cloud,
      api_key: cloudinaryAPI.apiKey,
      api_secret: cloudinaryAPI.apiSecret,
      upload_preset: cloudinaryAPI.uploadPreset,
    });
    const unique_id = parseInt(Math.random() * new Date().getTime());
    const public_id = `${cloudinaryAPI.projectName}/${folderName}/${name}-${unique_id}`;
    

    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: public_id,
    });
    console.log(result, "response from result",localFilePath,folderName);
    return {
      status: "success",
      data: result.url,
    };
  } catch (error) {
    console.log(error, "error from result",localFilePath,folderName);

    return { status: "error", data: error };
  }
  //  finally {
  //   fs.unlinkSync(localFilePath);
  // }
};
module.exports = uploadFile;