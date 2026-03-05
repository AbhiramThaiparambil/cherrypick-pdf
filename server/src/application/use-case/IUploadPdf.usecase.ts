import { UploadPdfUseCaseRequestDTO } from "../dtos/usecase/UploadPdfUseCaseRequest";

export interface IUploadPdfUsecase {
  execute(data:UploadPdfUseCaseRequestDTO): void;
}
