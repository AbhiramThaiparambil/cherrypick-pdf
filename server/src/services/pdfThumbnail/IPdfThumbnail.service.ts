import {
  thumbnailGenerationRequestDto,
  thumbnailGenerationResponseDto,
} from "../../application/dtos/service/pdfThumbnailService.dto";

export interface IPdfThumbnailService {
  generateThumbnails(
    data: thumbnailGenerationRequestDto,
  ): Promise<thumbnailGenerationResponseDto>;
}
