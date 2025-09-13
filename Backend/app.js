import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url'
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import authRoutes from "./routes/authrotes.js";
import planRoutes from "./routes/planRoutes.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use(cors());                 
app.use(express.json());        

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);


// Serve the UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app
