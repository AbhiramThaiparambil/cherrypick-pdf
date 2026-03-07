import { inject, injectable } from "tsyringe";
import { IPdfThumbnailService } from "../../../services/pdfThumbnail/IPdfThumbnail.service";
import { REPOSITORY_TOKEN, SERVICE_TOKEN } from "../../../constant/tocken";
import {
  GetPdfThumbnailsUseCaseRequestDTO,
  GetPdfThumbnailsUseCaseResponseDTO,
} from "../../dtos/usecase/GetPdfThumbnails.dto";
import { IPdfRepository } from "../../../domain/repositories/IPdfRepository";

@injectable()
export class GetPdfThumbnails {
  constructor(
    @inject(SERVICE_TOKEN.PDF_THUMBNAIL_SERVICE)
    private pdfService: IPdfThumbnailService,
    @inject(REPOSITORY_TOKEN.PDF_REPOSITORY) private pdfRepo: IPdfRepository,
  ) {}

  async execute(
    data: GetPdfThumbnailsUseCaseRequestDTO,
  ): Promise<GetPdfThumbnailsUseCaseResponseDTO> {
    const { _id, page, limit } = data;
    const { originalPdfPath } = await this.pdfRepo.findByById(_id);
    const thumbnails = await this.pdfService.generateThumbnails({
      filePath: originalPdfPath.path,
      page,
      limit,
    });
    return {
      thumbnails: thumbnails.thumbnails,
      fileName: originalPdfPath.fileName,
      count: thumbnails.count,
    };
  }
}
