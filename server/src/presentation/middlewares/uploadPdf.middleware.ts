import { NextFunction } from "connect";
import { Request, Response } from "express";
import { multerUpload } from "../../infrastructure/config/multer.config";

export const uploadPdfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const upload = multerUpload.single("pdf");

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    console.log(req.file);

    next();
  });
};
