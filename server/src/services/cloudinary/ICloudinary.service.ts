export interface ICloudinaryService {
  uploadPdf(buffer: Buffer, originalName?: string): Promise<string>;
  getThumbnailUrl(secureUrl: string, page: number): string;
  getPdfPageCount(secureUrl: string): Promise<number>;
  extractPdfPages(secureUrl: string, pages: number[]): Promise<Buffer>;
}
