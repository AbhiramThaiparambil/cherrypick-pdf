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
import { GetUserUploadedPdfsUseCase } from "./application/use-case/getUserUploadedPdfs/GetUserUploadedPdfs.usecase";
import { IGetUserUploadedPdfsUseCase } from "./application/use-case/getUserUploadedPdfs/IGetUserUploadedPdfsUseCase";
import { SignupUseCase } from "./application/use-case/signup/Signup.usecase";
import { ISignupUseCase } from "./application/use-case/signup/ISignup.usecase";
import { LoginUseCase } from "./application/use-case/login/Login.usecase";
import { ILoginUseCase } from "./application/use-case/login/ILogin.usecase";
import { IUserRepository } from "./domain/repositories/IUserRepository";
import { UserRepository } from "./infrastructure/repositories/User.repository";
import { ITokenService } from "./services/Token/IToken.service";
import { TokenService } from "./services/Token/Token.service";

container.register<IPdfUploadService>(SERVICE_TOKEN.PDF_UPLOAD_SERVICE, {
  useClass: UploadPdfService,
});

container.register<IPdfThumbnailService>(SERVICE_TOKEN.PDF_THUMBNAIL_SERVICE, {
  useClass: PdfThumbnailService,
});

container.register<IPdfExtractService>(SERVICE_TOKEN.PDF_EXTRACT_SERVICE, {
  useClass: PdfExtractService,
});

container.register<ITokenService>(SERVICE_TOKEN.TOKEN_SERVICE, {
  useClass: TokenService,
});

//usecase

container.register<ISignupUseCase>(USECASE_TOKEN.SIGNUP_USECASE, {
  useClass: SignupUseCase,
});

container.register<ILoginUseCase>(USECASE_TOKEN.LOGIN_USECASE, {
  useClass: LoginUseCase,
});

container.register<IUploadPdfUsecase>(USECASE_TOKEN.UPLOAD_PDF_USECASE, {
  useClass: UploadPdfUseCase,
});
container.register<IGetPdfThumbnails>(
  USECASE_TOKEN.GET_PDF_THUMBNAILS_USECASE,
  {
    useClass: GetPdfThumbnails,
  },
);

container.register<IGetUserUploadedPdfsUseCase>(
  USECASE_TOKEN.GET_USERUPLOADED_PDF_USECASE,
  {
    useClass: GetUserUploadedPdfsUseCase,
  },
);

container.register<IGeneratePdfUseCase>(USECASE_TOKEN.GENERATE_PDF_USECASE, {
  useClass: GeneratePdfUseCase,
});
// repository

container.register<IPdfRepository>(REPOSITORY_TOKEN.PDF_REPOSITORY, {
  useClass: PdfRepository,
});

container.register<IUserRepository>(REPOSITORY_TOKEN.USER_REPOSITORY, {
  useClass: UserRepository,
});
