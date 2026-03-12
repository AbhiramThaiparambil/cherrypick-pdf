import path from "path";
import { IPdfUploadService } from "./IPdfUpload.service";
import fs from "fs";
import {
  uploadPdfFileServiceRequestDto,
  uploadPdfFileServiceResponseDto,
} from "../application/dtos/service/uploadPdfFileService";
import { inject, injectable } from "tsyringe";
import { ICloudinaryService } from "./cloudinary/ICloudinary.service";
import { SERVICE_TOKEN } from "../constant/tocken";

@injectable()
export class UploadPdfService implements IPdfUploadService {
  constructor(
    @inject(SERVICE_TOKEN.CLOUDINARY_SERVICE)
    private cloudinaryService: ICloudinaryService
  ) {}

  async uploadPdf(
    data: uploadPdfFileServiceRequestDto,
  ): Promise<uploadPdfFileServiceResponseDto> {
    try {
      const { file } = data;
      // const uploadDir = path.join(process.cwd(), "uploads");
      const fileName = Date.now() + "-" + file.originalname;

      // if (!fs.existsSync(uploadDir)) {
      //   fs.mkdirSync(uploadDir);
      // }


      // const filePath = path.join(uploadDir, fileName);

      // await fs.promises.writeFile(filePath, file.buffer);

      const cloudinaryUrl = await this.cloudinaryService.uploadPdf(file.buffer, fileName);

      return {
        message: "PDF saved successfully",
        path: cloudinaryUrl, 
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      throw new Error("Error occurred while uploading PDF");
    }
  }
}
