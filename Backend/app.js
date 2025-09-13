import express from "express";
import cors from "cors";
import mlRoutes from "./routes/ml.routes.js";
// NOTE: subscription routes from another branch will need merging manually
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/ml', mlRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

export default app;
