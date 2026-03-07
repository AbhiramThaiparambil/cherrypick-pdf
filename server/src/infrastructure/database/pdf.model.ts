import mongoose, { Types } from "mongoose";
import { IPdf } from "../../domain/entities/IPdf";
interface ImodelPdf extends Omit<IPdf, "_id" | "user_Id"> {
  _id: Types.ObjectId;
  user_Id: Types.ObjectId;
}

const pdfSchema = new mongoose.Schema<ImodelPdf>({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  extractedPdfPath: {
    path: String,
  },
  originalPdfPath: {
    fileName: { type: String, required: true },
    path: { type: String, required: true },
  },
});

export const pdfModel = mongoose.model<ImodelPdf>("pdf", pdfSchema);
