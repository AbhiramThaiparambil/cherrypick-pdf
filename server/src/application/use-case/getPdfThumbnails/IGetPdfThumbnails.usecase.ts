import {
  GetPdfThumbnailsUseCaseRequestDTO,
  GetPdfThumbnailsUseCaseResponseDTO,
} from "../../dtos/usecase/GetPdfThumbnails.dto";

export interface IGetPdfThumbnails {
  execute(
    data: GetPdfThumbnailsUseCaseRequestDTO,
  ): Promise<GetPdfThumbnailsUseCaseResponseDTO>;
}
