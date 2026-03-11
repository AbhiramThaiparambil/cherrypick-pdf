import { inject, injectable } from "tsyringe";
import { IDeletePdfUseCase } from "./IDeletePdfUseCase";
import { REPOSITORY_TOKEN } from "../../../constant/tocken";
import { IPdfRepository } from "../../../domain/repositories/IPdfRepository";
import { DeletePdfRequestDTO } from "../../dtos/usecase/DeletePdf.dto";

@injectable()
export class DeletePdfUseCase implements IDeletePdfUseCase {
  constructor(
    @inject(REPOSITORY_TOKEN.PDF_REPOSITORY)
    private pdfRepository: IPdfRepository
  ) {}

  async execute(data: DeletePdfRequestDTO): Promise<boolean> {
    try {
      const result = await this.pdfRepository.deleteById(data.pdfId);
      return result;
    } catch (error) {
      console.error("Error in DeletePdfUseCase:", error);
      throw error;
    }
  }
}
