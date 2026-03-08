import { config } from "dotenv";
import app from "./app";
import { configMongoDb } from "./infrastructure/config/mongodb.config";

config();

configMongoDb();

const port = Number(process.env.PORT) || 4040;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});