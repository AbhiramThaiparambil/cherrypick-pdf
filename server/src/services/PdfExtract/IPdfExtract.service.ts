export interface IPdfExtractService {
  extractPages(filePath: string, pages: number[]): Promise<Buffer>;
}
