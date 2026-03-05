import express from "express";
import pdfRoute from "./presentation/routes/pdf.routes";
const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use("/", pdfRoute);
export default app;
