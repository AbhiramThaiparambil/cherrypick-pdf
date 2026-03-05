export interface UploadPdfUseCaseRequestDTO {
  userId: string;
  file: Express.Multer.File;
}
