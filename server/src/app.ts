import "reflect-metadata";
import "./container";
import express from "express";
import pdfRoute from "./presentation/routes/pdf.routes";
import morgan from "morgan";
const app = express();

import cors from "cors";
import authRouter from "./presentation/routes/auth.routes";
import { errorHandler } from "./presentation/middlewares/errorHandler.middleware";
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/", pdfRoute);
app.use("/auth", authRouter);
app.use(errorHandler);
export default app;
