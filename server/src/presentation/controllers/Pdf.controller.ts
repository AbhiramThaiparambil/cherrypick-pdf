import { inject, injectable } from "tsyringe";
import { IUploadPdfUsecase } from "../../application/use-case/IUploadPdf.usecase";
import { USECASE_TOKEN } from "../../constant/tocken";
import { NextFunction, Request, Response } from "express";
import { IGetPdfThumbnails } from "../../application/use-case/getPdfThumbnails/IGetPdfThumbnails.usecase";
import { GeneratePdfRequestDTO } from "../../application/dtos/usecase/GeneratePdf.dto";

import { GetUserUploadedPdfsRequestDTO } from "../../application/dtos/usecase/GetUserUploadedPdfs.dto";

import { IGeneratePdfUseCase } from "../../application/use-case/generateNewPdf/IGeneratePdfUseCase";
import { IGetUserUploadedPdfsUseCase } from "../../application/use-case/getUserUploadedPdfs/IGetUserUploadedPdfsUseCase";
import { IDeletePdfUseCase } from "../../application/use-case/deletePdf/IDeletePdfUseCase";
import { DeletePdfRequestDTO } from "../../application/dtos/usecase/DeletePdf.dto";

@injectable()
export class PdfController {
  constructor(
    @inject(USECASE_TOKEN.UPLOAD_PDF_USECASE)
    private uploadPdfUsecase: IUploadPdfUsecase,
    @inject(USECASE_TOKEN.GET_PDF_THUMBNAILS_USECASE)
    private getPdfThumbnailsUsecase: IGetPdfThumbnails,
    @inject(USECASE_TOKEN.GENERATE_PDF_USECASE)
    private generatePdfUseCase: IGeneratePdfUseCase,
    @inject(USECASE_TOKEN.GET_USERUPLOADED_PDF_USECASE)
    private getUserPdfsUsecase: IGetUserUploadedPdfsUseCase,
    @inject(USECASE_TOKEN.DELETE_PDF_USECASE)
    private deletePdfUseCase: IDeletePdfUseCase,
  ) {}

  async uploadPdf(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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
        userId: res.locals.userId,
      });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Upload PDF error:", error);

      next(error);
    }
  }

  async getPdfPages(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _id = req.params.id + "";
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      console.log(req.query);
      const data = await this.getPdfThumbnailsUsecase.execute({
        _id,
        page,
        limit,
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async generatePdf(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { pdfId, pages } = req.body;

      console.log(pdfId, pages);
      console.log(
        "------------------------------------------------------------",
      );

      const requestDTO: GeneratePdfRequestDTO = {
        pdfId,
        pages,
      };

      const result = await this.generatePdfUseCase.execute(requestDTO);

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${result.fileName}`,
      );

      res.send(result.fileBuffer);
    } catch (error) {
      next(error);
    }
  }

  async getUserUploadedPdfs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = res.locals.userId;
      const requestDTO: GetUserUploadedPdfsRequestDTO = {
        userId: userId,
      };
      const result = await this.getUserPdfsUsecase.execute(requestDTO);

      res.status(200).json(result);
    } catch (error) {}
  }

  async deletePdf(req: Request, res: Response): Promise<void> {
    try {
      const pdfId = req.params.id as string;
      if (!pdfId) {
        res.status(400).json({ message: "PDF ID is required" });
        return;
      }

      const requestDTO: DeletePdfRequestDTO = { pdfId };
      const success = await this.deletePdfUseCase.execute(requestDTO);

      if (success) {
        res.status(200).json({ message: "PDF deleted successfully" });
      } else {
        res.status(404).json({ message: "PDF not found" });
      }
    } catch (error) {
      console.error("Delete PDF error:", error);
      res.status(500).json({
        message: "Failed to delete PDF",
      });
    }
  }
}
