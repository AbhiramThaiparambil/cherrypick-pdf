import { pdf } from "pdf-to-img";
import { thumbnailGenerationRequestDto, thumbnailGenerationResponseDto } from "../../application/dtos/service/pdfThumbnailService.dto";
import { IPdfThumbnailService } from "./IPdfThumbnail.service";

export class PdfThumbnailService implements IPdfThumbnailService {
  async generateThumbnails(
    data: thumbnailGenerationRequestDto,
  ): Promise<thumbnailGenerationResponseDto> {
    const { filePath, page, limit } = data;
    if (page < 1 || limit < 1) return { thumbnails: [], count: 0 };

    const document = await pdf(filePath);

    const start = (page - 1) * limit + 1;
    const end = Math.min(start + limit - 1, document.length); 

    const thumbnails: { thumbnail: string; page: number }[] = [];

    for (let pageNum = start; pageNum <= end; pageNum++) {
      const image = await document.getPage(pageNum); 
      thumbnails.push({
        thumbnail: `data:image/png;base64,${image.toString("base64")}`,
        page: pageNum, 
      });
    }

    return {
      thumbnails: thumbnails,
      count: document.length,
    };
  }
}