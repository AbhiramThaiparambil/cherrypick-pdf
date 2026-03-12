import { injectable } from "tsyringe";
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryService } from "./ICloudinary.service";
import { PDFDocument } from "pdf-lib";
import dotenv from "dotenv";
dotenv.config();

@injectable()
export class CloudinaryService implements ICloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  getThumbnailUrl(secureUrl: string, page: number): string {
    let thumbnailUrl = secureUrl;
    thumbnailUrl = thumbnailUrl.replace(/\.pdf$/, ".jpg");
    thumbnailUrl = thumbnailUrl.replace(/\/upload\//, `/upload/pg_${page}/`);
    return thumbnailUrl;
  }

  async getPdfPageCount(secureUrl: string): Promise<number> {
    const response = await fetch(secureUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const document = await PDFDocument.load(arrayBuffer);
    return document.getPageCount();
  }

  async extractPdfPages(secureUrl: string, pages: number[]): Promise<Buffer> {
    const pageString = pages.join(";");
    const extractUrl = secureUrl.replace(/\/upload\//, `/upload/pg_${pageString}/`);
    const response = await fetch(extractUrl);
    if (!response.ok) {
        throw new Error(`Cloudinary extraction failed: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async uploadPdf(buffer: Buffer, originalName?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const publicId = originalName 
        ? originalName.replace(/\.[^/.]+$/, "") 
        : undefined;

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto", 
          format: "pdf",
          folder: "cherrypick-pdf/uploads", 
          ...(publicId && { public_id: publicId })
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
