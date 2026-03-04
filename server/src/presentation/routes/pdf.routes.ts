import { Router, Request, Response } from "express";
const pdfRoute = Router();

pdfRoute.get("/", (req: Request, res: Response) => {
  res.status(200).json("hellodfdf ");
});

export default pdfRoute;
