import { inject, injectable } from "tsyringe";
import {
  GeneratePdfRequestDTO,
  GeneratePdfResponseDTO,
} from "../../dtos/usecase/GeneratePdf.dto";
import { IGeneratePdfUseCase } from "./IGeneratePdfUseCase";
import { REPOSITORY_TOKEN, SERVICE_TOKEN } from "../../../constant/tocken";
import { IPdfRepository } from "../../../domain/repositories/IPdfRepository";
import { IPdfExtractService } from "../../../services/PdfExtract/IPdfExtract.service";

@injectable()
export class GeneratePdfUseCase implements IGeneratePdfUseCase {
  constructor(
    @inject(SERVICE_TOKEN.PDF_EXTRACT_SERVICE)
    private pdfExtractService: IPdfExtractService,
    @inject(REPOSITORY_TOKEN.PDF_REPOSITORY)
    private pdfRepository: IPdfRepository,
  ) {}

  async execute(
    request: GeneratePdfRequestDTO,
  ): Promise<GeneratePdfResponseDTO> {
    const { pdfId, pages } = request;
    const pdfData = await this.pdfRepository.findByById(pdfId);

    if (!pdfData) {
      throw new Error("PDF not found");
    }

    const filePath = pdfData.originalPdfPath.path;

    const buffer = await this.pdfExtractService.extractPages(filePath, pages);

    return {
      fileName: `${pdfData.originalPdfPath.fileName}_cherry_pick.pdf`,
      fileBuffer: buffer,
    };
  }
}
