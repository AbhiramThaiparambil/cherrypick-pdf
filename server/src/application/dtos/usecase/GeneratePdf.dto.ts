export interface GeneratePdfRequestDTO {
  pdfId: string;
  pages: number[];
}
export interface GeneratePdfResponseDTO {
  fileName: string;
  fileBuffer: Buffer;
}
