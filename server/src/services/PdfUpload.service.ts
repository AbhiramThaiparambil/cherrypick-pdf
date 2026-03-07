import path from "path";
import { IPdfUploadService } from "./IPdfUpload.service";
import fs from "fs";
import {
  uploadPdfFileServiceRequestDto,
  uploadPdfFileServiceResponseDto,
} from "../application/dtos/service/uploadPdfFileService";
import { injectable } from "tsyringe";
@injectable()
export class UploadPdfService implements IPdfUploadService {
  async uploadPdf(
    data: uploadPdfFileServiceRequestDto,
  ): Promise<uploadPdfFileServiceResponseDto> {
    try {
      const { file } = data;
      const uploadDir = path.join(process.cwd(), "uploads");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      const fileName = Date.now() + "-" + file.originalname;

      const filePath = path.join(uploadDir, fileName);

      await fs.promises.writeFile(filePath, file.buffer);

      return {
        message: "PDF saved successfully",
        path: filePath,
      };
    } catch (error) {
      console.error("Error uploading PDF:", error);
      throw new Error("Error occurred while uploading PDF");
    }
  }
}
