import "reflect-metadata";
import "./container";
import express from "express";
import pdfRoute from "./presentation/routes/pdf.routes";
import morgan from "morgan";
const app = express();

import cors from "cors";
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/", pdfRoute);
export default app;
