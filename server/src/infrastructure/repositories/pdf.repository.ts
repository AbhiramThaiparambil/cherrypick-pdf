import { IPdf } from "../../domain/entities/IPdf";
import { pdfModel } from "../database/pdf.model";
import { CreatePdfRepositoryDto } from "./dtos/pdfRepository.dto";
import { IPdfRepository } from "../../domain/repositories/IPdfRepository";

export class PdfRepository implements IPdfRepository {
  async createNewPdf(data: CreatePdfRepositoryDto): Promise<IPdf> {
    console.log(data);
    const pdf = await pdfModel.create(data);

    return {
      _id: pdf._id.toString(),
      user_Id: pdf.user_Id.toString(),
      originalPdfPath: pdf.originalPdfPath,
      extractedPdfPath: pdf.extractedPdfPath,
    };
  }

  async getPdfById(_id: string): Promise<IPdf> {
    const pdf = await pdfModel.findById(_id);
    if (!pdf) {
      throw new Error("Pdf not found");
    }
    return {
      _id: pdf._id.toString(),
      user_Id: pdf.user_Id.toString(),
      originalPdfPath: pdf.originalPdfPath,
      extractedPdfPath: pdf.extractedPdfPath,
    };
  }
}
