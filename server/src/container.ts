import { container } from "tsyringe";
import {
  REPOSITORY_TOKEN,
  SERVICE_TOKEN,
  USECASE_TOKEN,
} from "./constant/tocken";
import { UploadPdfService } from "./services/PdfUpload.service";
import { IPdfUploadService } from "./services/IPdfUpload.service";
import { IUploadPdfUsecase } from "./application/use-case/IUploadPdf.usecase";
import { UploadPdfUseCase } from "./application/use-case/UploadPdf.usecase";
import { IPdfRepository } from "./domain/repositories/IPdfRepository";
import { PdfRepository } from "./infrastructure/repositories/pdf.repository";

container.register<IPdfUploadService>(SERVICE_TOKEN.PDF_UPLOAD_SERVICE, {
  useClass: UploadPdfService,
});

//usecase

container.register<IUploadPdfUsecase>(USECASE_TOKEN.UPLOAD_PDF_USECASE, {
  useClass: UploadPdfUseCase,
});

// repository

container.register<IPdfRepository>(REPOSITORY_TOKEN.PDF_REPOSITORY, {
  useClass: PdfRepository,
});
