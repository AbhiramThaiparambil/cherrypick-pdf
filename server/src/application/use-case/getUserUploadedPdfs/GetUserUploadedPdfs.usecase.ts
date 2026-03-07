import { inject, injectable } from "tsyringe";
import {
  GetUserUploadedPdfsRequestDTO,
  IGetUserUploadedPdfsResponseDTO,
} from "../../dtos/usecase/GetUserUploadedPdfs.dto";
import { IGetUserUploadedPdfsUseCase } from "./IGetUserUploadedPdfsUseCase";
import { REPOSITORY_TOKEN } from "../../../constant/tocken";
import { IPdfRepository } from "../../../domain/repositories/IPdfRepository";
@injectable()
export class GetUserUploadedPdfsUseCase implements IGetUserUploadedPdfsUseCase {
  constructor(
    @inject(REPOSITORY_TOKEN.PDF_REPOSITORY) private pdfRepo: IPdfRepository,
  ) {}
  async execute(
    data: GetUserUploadedPdfsRequestDTO,
  ): Promise<IGetUserUploadedPdfsResponseDTO[]> {
    const { userId } = data;

    const result = await this.pdfRepo.findByUserId(userId);

    return result.map((pdf) => {
      return { _id: pdf._id, fileName: pdf.originalPdfPath.fileName };
    });
  }
}
