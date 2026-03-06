import { CreatePdfRepositoryDto } from "../../infrastructure/repositories/dtos/pdfRepository.dto";
import { IPdf } from "../entities/IPdf";

export interface IPdfRepository {
  createNewPdf(data: CreatePdfRepositoryDto): Promise<IPdf>;
  getPdfById(_id: string): Promise<IPdf>;
}
