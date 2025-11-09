// /lib/cloudinary.js
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function uploadToCloudinary(bufferOrPath, options = {}) {
    // bufferOrPath can be a local path or base64 data; this helper uses cloudinary.uploader.upload
    return cloudinary.v2.uploader.upload(bufferOrPath, options);
}
