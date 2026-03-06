import { IPdfExtractService } from "./IPdfExtract.service";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import { injectable } from "tsyringe";
@injectable()
export class PdfExtractService implements IPdfExtractService {
  async extractPages(filePath: string, pages: number[]): Promise<Buffer> {
    const orginalPdfBytes = await fs.promises.readFile(filePath);
    const orginalPdf = await PDFDocument.load(orginalPdfBytes);
    const newPdf = await PDFDocument.create();

    const pageIndex = pages.map((p) => p - 1);

    const copiedPage = await newPdf.copyPages(orginalPdf, pageIndex);

    copiedPage.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();
    return Buffer.from(pdfBytes);
  }
}
