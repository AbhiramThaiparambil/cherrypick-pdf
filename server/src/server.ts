import { config } from "dotenv";
import app from "./app";
config();
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log("server is running on" + port);
});
