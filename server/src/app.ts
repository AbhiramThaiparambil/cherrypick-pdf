import "reflect-metadata";
import "./container";
import express from "express";
import pdfRoute from "./presentation/routes/pdf.routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();

import cors from "cors";
import authRouter from "./presentation/routes/auth.routes";
import { errorHandler } from "./presentation/middlewares/errorHandler.middleware";
app.use(morgan("dev"));
console.log("FRONTEND_URL:"+process.env.FRONTEND_URL)
app.use(
  cors({
    origin: process.env.FRONTEND_URL ,
    credentials: true,
  }),
);


app.use(express.json());
app.use(cookieParser());
app.use("/", pdfRoute);
app.use("/auth", authRouter);
app.use(errorHandler);
export default app;
