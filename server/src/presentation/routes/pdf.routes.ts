import { Router, Request, Response } from "express";
import multer from "multer";
import { uploadPdfMiddleware } from "../middlewares/uploadPdf.middleware";
import { PdfController } from "../controllers/Pdf.controller";
import { container } from "tsyringe";
import { authMiddleware } from "../middlewares/auth.middleware";
const pdfController = container.resolve(PdfController);

const pdfRoute = Router();

pdfRoute.post(
  "/upload-pdf",
  authMiddleware,
  uploadPdfMiddleware,

  pdfController.uploadPdf.bind(pdfController),
);

pdfRoute.get(
  "/pdf/:id/thumbnails",
  authMiddleware,
  pdfController.getPdfPages.bind(pdfController),
);

pdfRoute.post(
  "/pdf/generate",
  authMiddleware,
  pdfController.generatePdf.bind(pdfController),
);

pdfRoute.get(
  "/pdf/user-uploaded",
  authMiddleware,
  pdfController.getUserUploadedPdfs.bind(pdfController),
);

export default pdfRoute;
