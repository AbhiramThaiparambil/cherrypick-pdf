import { inject, injectable } from "tsyringe";
import { IUploadPdfUsecase } from "../../application/use-case/IUploadPdf.usecase";
import { USECASE_TOKEN } from "../../constant/tocken";
import { Request, Response } from "express";
@injectable()
export class PdfController {
  constructor(
    @inject(USECASE_TOKEN.UPLOAD_PDF_USECASE)
    private uploadPdfUsecase: IUploadPdfUsecase,
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
        userId: "001",
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Upload PDF error:", error);

      res.status(500).json({
        message: "Failed to upload PDF",
      });
    }
  }
}
