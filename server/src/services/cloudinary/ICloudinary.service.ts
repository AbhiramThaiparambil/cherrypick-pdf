export interface ICloudinaryService {
  uploadPdf(buffer: Buffer): Promise<string>;
}
