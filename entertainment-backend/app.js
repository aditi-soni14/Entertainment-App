import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";  // Import MongoDB connection function
import authRoutes from "./routes/authRoutes.js"; // Import authentication routes


dotenv.config();


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
app.get("/", (req, res) => res.send("Entertainment App Backend Running"));


export default app;
