import { config } from "dotenv";
import app from "./app";
import { configMongoDb } from "./infrastructure/config/mongodb.config";

config();

configMongoDb();

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log("server is running on" + port);
});
