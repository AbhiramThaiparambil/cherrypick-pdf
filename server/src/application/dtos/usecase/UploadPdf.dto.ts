export interface UploadPdfUseCaseRequestDTO {
  userId: string;
  file: Express.Multer.File;
}

export interface UploadPdfUseCaseResponsetDTO {
  _id: string;
  fileName: string;
}
