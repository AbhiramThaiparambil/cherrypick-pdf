import {
  uploadPdfFileServiceRequestDto,
  uploadPdfFileServiceResponseDto,
} from "../application/dtos/service/uploadPdfFileService";

export interface IPdfUploadService {
  uploadPdf(
    data: uploadPdfFileServiceRequestDto,
  ): Promise<uploadPdfFileServiceResponseDto>;
}
