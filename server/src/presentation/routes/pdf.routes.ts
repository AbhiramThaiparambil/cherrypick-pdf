import { Router, Request, Response } from "express";
import multer from "multer";
import { uploadPdfMiddleware } from "../middlewares/uploadPdf.middleware";
import { PdfController } from "../controllers/Pdf.controller";
import { container } from "tsyringe";
const pdfController = container.resolve(PdfController);

const pdfRoute = Router();

pdfRoute.post(
  "/upload-pdf",
  uploadPdfMiddleware,
  pdfController.uploadPdf.bind(pdfController),
);

pdfRoute.get(
  "/pdf/:id/thumbnails",
  pdfController.getPdfPages.bind(pdfController),
);

pdfRoute.post("/pdf/generate", pdfController.generatePdf.bind(pdfController));

pdfRoute.get(
  "/pdf/user-uploaded",
  pdfController.getUserUploadedPdfs.bind(pdfController),
);

export default pdfRoute;
