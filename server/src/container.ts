import { container } from "tsyringe";
import { SERVICE_TOKEN, USECASE_TOKEN } from "./constant/tocken";
import { UploadPdfService } from "./services/PdfUpload.service";
import { IPdfUploadService } from "./services/IPdfUpload.service";
import { IUploadPdfUsecase } from "./application/use-case/IUploadPdf.usecase";
import { UploadPdfUseCase } from "./application/use-case/UploadPdf.usecase";

container.register<IPdfUploadService>(SERVICE_TOKEN.PDF_UPLOAD_SERVICE, {
  useClass: UploadPdfService,
});

//usecase

container.register<IUploadPdfUsecase>(USECASE_TOKEN.UPLOAD_PDF_USECASE, {
  useClass: UploadPdfUseCase,
});
