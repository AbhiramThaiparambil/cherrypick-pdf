import { CreatePdfRepositoryDto } from "../../infrastructure/repositories/dtos/pdfRepository.dto";
import { IPdf } from "../entities/IPdf";

export interface IPdfRepository {
  createNewPdf(data: CreatePdfRepositoryDto): Promise<IPdf>;
  findByById(_id: string): Promise<IPdf>;
  findByUserId(userId: string): Promise<IPdf[]>;
  deleteById(_id: string): Promise<boolean>;
}
