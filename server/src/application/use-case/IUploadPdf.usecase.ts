import { IPdf } from "../../domain/entities/IPdf";
import {
  UploadPdfUseCaseRequestDTO,
  UploadPdfUseCaseResponsetDTO,
} from "../dtos/usecase/UploadPdf.dto";

export interface IUploadPdfUsecase {
  execute(
    data: UploadPdfUseCaseRequestDTO,
  ): Promise<UploadPdfUseCaseResponsetDTO>;
}
