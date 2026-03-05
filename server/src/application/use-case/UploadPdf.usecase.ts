import { SERVICE_TOKEN } from "../../constant/tocken";
import { IPdfUploadService } from "../../services/IPdfUpload.service";
import { UploadPdfUseCaseRequestDTO } from "../dtos/usecase/UploadPdfUseCaseRequest";
import { IUploadPdfUsecase } from "./IUploadPdf.usecase";
import { inject, injectable } from "tsyringe";

@injectable()
export class UploadPdfUseCase implements IUploadPdfUsecase {
  constructor(
    @inject(SERVICE_TOKEN.PDF_UPLOAD_SERVICE)
    private pdfUploadService: IPdfUploadService,
  ) {}
  execute(data: UploadPdfUseCaseRequestDTO): void {
    const { file, userId } = data;
    this.pdfUploadService.uploadPdf({ file });
  }
}
