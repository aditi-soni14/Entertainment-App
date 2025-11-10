import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";  // Import MongoDB connection function
import authRoutes from "./routes/authRoutes.js"; // Import authentication routes

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ================== MIDDLEWARE ==================

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// ================== ROUTES ==================

// Auth routes (signup & login) prefixed with /api/auth
app.use("/api/auth", authRoutes);

// Simple test route to verify server is running
app.get("/", (req, res) => res.send("🎬 Entertainment App Backend Running"));

// Export the app for use in server entry point
export default app;
