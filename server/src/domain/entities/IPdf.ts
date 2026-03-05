export interface IPdf {
  _id: string;
  user_Id: string;
  originalPdfPath: {
    fileName: string;
    path: string;
  };
  extractedPdfPath: {
    path: string;
  };
}
