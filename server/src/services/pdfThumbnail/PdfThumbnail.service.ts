import { thumbnailGenerationRequestDto, thumbnailGenerationResponseDto } from "../../application/dtos/service/pdfThumbnailService.dto";
import { IPdfThumbnailService } from "./IPdfThumbnail.service";
import { inject, injectable } from "tsyringe";
import { ICloudinaryService } from "../cloudinary/ICloudinary.service";
import { SERVICE_TOKEN } from "../../constant/tocken";

@injectable()
export class PdfThumbnailService implements IPdfThumbnailService {
  constructor(
    @inject(SERVICE_TOKEN.CLOUDINARY_SERVICE)
    private cloudinaryService: ICloudinaryService
  ) {}

  async generateThumbnails(
    data: thumbnailGenerationRequestDto,
  ): Promise<thumbnailGenerationResponseDto> {
    const { filePath, page, limit } = data;
    if (page < 1 || limit < 1) return { thumbnails: [], count: 0 };

    const pageCount = await this.cloudinaryService.getPdfPageCount(filePath);

    const start = (page - 1) * limit + 1;
    const end = Math.min(start + limit - 1, pageCount); 

    const thumbnails: { thumbnail: string; page: number }[] = [];

    for (let pageNum = start; pageNum <= end; pageNum++) {
      const thumbnailUrl = this.cloudinaryService.getThumbnailUrl(filePath, pageNum);

      thumbnails.push({
        thumbnail: thumbnailUrl,
        page: pageNum, 
      });
    }

    return {
      thumbnails: thumbnails,
      count: pageCount,
    };
  }
}