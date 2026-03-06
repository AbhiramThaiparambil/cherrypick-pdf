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
import { IPdfThumbnailService } from "./services/pdfThumbnail/IPdfThumbnail.service";
import { PdfThumbnailService } from "./services/pdfThumbnail/PdfThumbnail.service";
import { GetPdfThumbnails } from "./application/use-case/getPdfThumbnails/GetPdfThumbnails.usecase";
import { IGetPdfThumbnails } from "./application/use-case/getPdfThumbnails/IGetPdfThumbnails.usecase";
import { IPdfExtractService } from "./services/PdfExtract/IPdfExtract.service";
import { PdfExtractService } from "./services/PdfExtract/PdfExtract.service";
import { IGeneratePdfUseCase } from "./application/use-case/generateNewPdf/IGeneratePdfUseCase";
import { GeneratePdfUseCase } from "./application/use-case/generateNewPdf/GeneratePdfUseCase";

container.register<IPdfUploadService>(SERVICE_TOKEN.PDF_UPLOAD_SERVICE, {
  useClass: UploadPdfService,
});

container.register<IPdfThumbnailService>(SERVICE_TOKEN.PDF_THUMBNAIL_SERVICE, {
  useClass: PdfThumbnailService,
});

container.register<IPdfExtractService>(SERVICE_TOKEN.PDF_EXTRACT_SERVICE, {
  useClass: PdfExtractService,
});

//usecase

container.register<IUploadPdfUsecase>(USECASE_TOKEN.UPLOAD_PDF_USECASE, {
  useClass: UploadPdfUseCase,
});
container.register<IGetPdfThumbnails>(
  USECASE_TOKEN.GET_PDF_THUMBNAILS_USECASE,
  {
    useClass: GetPdfThumbnails,
  },
);

container.register<IGeneratePdfUseCase>(USECASE_TOKEN.GENERATE_PDF_USECASE, {
  useClass: GeneratePdfUseCase,
});
// repository

container.register<IPdfRepository>(REPOSITORY_TOKEN.PDF_REPOSITORY, {
  useClass: PdfRepository,
});
