import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const configMongoDb = async () => {
  const url = process.env.MONGO_DB_URL;

  try {
    if (!url) {
      throw new Error("MongoDB URL is missing");
    }

    await mongoose.connect(url);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);

    process.exit(1);
  }
};
