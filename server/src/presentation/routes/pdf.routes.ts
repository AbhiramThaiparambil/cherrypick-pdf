import { Router, Request, Response } from "express";
import multer from "multer";
const pdfRoute = Router();
const upload = multer({ dest: "uploads" });
pdfRoute.post(
  "/upload-pdf",
  upload.single("pdf"),
  (req: Request, res: Response) => {
    console.log(req.file);
    console.log(req.body);

    res.status(200).json("hellodfdf ");
  },
);

export default pdfRoute;
