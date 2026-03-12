import { injectable } from "tsyringe";
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryService } from "./ICloudinary.service";

@injectable()
export class CloudinaryService implements ICloudinaryService {
  constructor() {
    console.log("cloudinary service");
     console.log(process.env.CLOUDINARY_CLOUD_NAME);
     console.log(process.env.CLOUDINARY_API_KEY);
     console.log(process.env.CLOUDINARY_API_SECRET);
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }


  async uploadPdf(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw", 
          format: "pdf",
          folder: "cherrypick-pdf/uploads", 
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Failed to upload PDF to Cloudinary"));
          } else if (result && result.secure_url) {
            resolve(result.secure_url);
          } else {
            reject(new Error("Cloudinary upload did not return a secure URL"));
          }
        }
      );

      uploadStream.end(buffer);
    });
  }
}
