export interface CreatePdfRepositoryDto {
  user_Id: string;
  originalPdfPath: {
    fileName: string;
    path: string;
  };
}
