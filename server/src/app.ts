import express from "express";
import pdfRoute from "./presentation/routes/pdf.routes";
const app = express();
app.use("/", pdfRoute);
export default app;
