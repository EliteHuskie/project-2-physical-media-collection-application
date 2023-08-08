const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImageToCloud(img, username, collectionName) {
  try {
    const result = await cloudinary.uploader.upload(img, {
      folder: username,
      public_id: collectionName,
    });

    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image: ", error);
  }
}

module.exports = uploadImageToCloud;
