import { REPOSITORY_TOKEN, SERVICE_TOKEN } from "../../constant/tocken";
import { IPdf } from "../../domain/entities/IPdf";
import { IPdfRepository } from "../../domain/repositories/IPdfRepository";
import { IPdfUploadService } from "../../services/IPdfUpload.service";
import { UploadPdfUseCaseRequestDTO } from "../dtos/usecase/UploadPdfUseCaseRequest";
import { IUploadPdfUsecase } from "./IUploadPdf.usecase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UploadPdfUseCase implements IUploadPdfUsecase {
  constructor(
    @inject(SERVICE_TOKEN.PDF_UPLOAD_SERVICE)
    private pdfUploadService: IPdfUploadService,
    @inject(REPOSITORY_TOKEN.PDF_REPOSITORY) private pdfRepo: IPdfRepository,
  ) {}
  async execute(data: UploadPdfUseCaseRequestDTO): Promise<IPdf> {
    const { file, userId } = data;
    const { path } = await this.pdfUploadService.uploadPdf({ file });
    return await this.pdfRepo.createNewPdf({
      originalPdfPath: {
        fileName: file.originalname,
        path,
      },
      user_Id: userId,
    });
  }
}
