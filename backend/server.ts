import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const emergencyRoutesPath = path.join(__dirname, "src", "routes", "emergency.ts");
if (fs.existsSync(emergencyRoutesPath)) {
  const emergencyRoutes = require("./src/routes/emergency").default;
  app.use("/api", emergencyRoutes);
  console.log("✅ Emergency routes loaded");
} else {
  console.warn("⚠️  Emergency routes file not found at:", emergencyRoutesPath);
}

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ 
    status: "Backend server is running",
    services: {
      emergency: fs.existsSync(emergencyRoutesPath) ? "active" : "not found"
    }
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
  console.log(`🆘 Emergency API: POST http://localhost:${PORT}/api/contacts`);
  console.log(`🆘 Emergency API: GET http://localhost:${PORT}/api/contacts`);
  console.log(`🆘 Emergency API: POST http://localhost:${PORT}/api/send-sos`);
  console.log(`🌐 Health check: GET http://localhost:${PORT}/health`);
});