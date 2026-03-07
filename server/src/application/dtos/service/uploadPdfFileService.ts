export interface uploadPdfFileServiceRequestDto {
  file: Express.Multer.File;
}

export interface uploadPdfFileServiceResponseDto {
  message: string;
  path: string;
}
