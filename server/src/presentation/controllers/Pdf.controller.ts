import { inject, injectable } from "tsyringe";
import { IUploadPdfUsecase } from "../../application/use-case/IUploadPdf.usecase";
import { USECASE_TOKEN } from "../../constant/tocken";
import { Request, Response } from "express";
import { IGetPdfThumbnails } from "../../application/use-case/getPdfThumbnails/IGetPdfThumbnails.usecase";
@injectable()
export class PdfController {
  constructor(
    @inject(USECASE_TOKEN.UPLOAD_PDF_USECASE)
    private uploadPdfUsecase: IUploadPdfUsecase,
    @inject(USECASE_TOKEN.GET_PDF_THUMBNAILS_USECASE)
    private getPdfThumbnailsUsecase: IGetPdfThumbnails,
  ) {}

  async uploadPdf(req: Request, res: Response): Promise<void> {
    try {
      console.log("---------");
      console.log(req.file);
      if (!req.file) {
        res.status(400).json({
          message: "PDF file not found",
        });
        return;
      }

      const result = await this.uploadPdfUsecase.execute({
        file: req.file,
        userId: "69918dc54e619eb2a9a72645",
      });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Upload PDF error:", error);

      res.status(500).json({
        message: "Failed to upload PDF",
      });
    }
  }

  async getPdfPages(req: Request, res: Response): Promise<void> {
    try {
      const _id = req.params.id + "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const data = await this.getPdfThumbnailsUsecase.execute({
        _id,
        page,
        limit,
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      res.status(500).json({
        message: "Failed to generate thumbnails",
      });
    }
  }
}
