import app from "./app.js";
import dotenv from "dotenv"
import connection from "./dbConfig.js";

dotenv.config();
connection()

const PORT = process.env.PORT || 5007;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
