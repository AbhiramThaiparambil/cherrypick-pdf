import { IPdfExtractService } from "./IPdfExtract.service";
import { inject, injectable } from "tsyringe";
import { ICloudinaryService } from "../cloudinary/ICloudinary.service";
import { SERVICE_TOKEN } from "../../constant/tocken";

@injectable()
export class PdfExtractService implements IPdfExtractService {
  constructor(
    @inject(SERVICE_TOKEN.CLOUDINARY_SERVICE)
    private cloudinaryService: ICloudinaryService
  ) {}

  async extractPages(filePath: string, pages: number[]): Promise<Buffer> {
    return this.cloudinaryService.extractPdfPages(filePath, pages);
  }
}
