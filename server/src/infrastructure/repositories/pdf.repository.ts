import { IPdf } from "../../domain/entities/IPdf";
import { pdfModel } from "../database/pdf.model";
import { CreatePdfRepositoryDto } from "./dtos/pdfRepository.dto";
import { IPdfRepository } from "../../domain/repositories/IPdfRepository";
import { Types } from "mongoose";

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

  async findByById(_id: string): Promise<IPdf> {
    const pdf = await pdfModel.findById(_id).lean().exec();
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

  async findByUserId(userId: string): Promise<IPdf[]> {
    const user_Id = new Types.ObjectId(userId);
    const pdfs = await pdfModel.find({ user_Id }).lean().exec();
    return pdfs.map((pdf) => {
      return {
        _id: pdf._id.toString(),
        user_Id: pdf.user_Id.toString(),
        originalPdfPath: pdf.originalPdfPath,
        extractedPdfPath: pdf.extractedPdfPath,
      };
    });
  }
}
