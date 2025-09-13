import express from "express"
import cors from "cors"
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();

app.use(cors());                 
app.use(express.json());        

app.use("/api/subscriptions", subscriptionRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

export default app
