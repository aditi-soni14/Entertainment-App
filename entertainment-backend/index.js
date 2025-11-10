import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Import user-related routes
import connectDB from "./config/db.js"; // Import MongoDB connection function

// Load environment variables from .env file
dotenv.config();

const app = express();

// ================== MIDDLEWARE ==================

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// ================== DATABASE ==================

// Connect to MongoDB
connectDB();

// ================== ROUTES ==================

// User-related API routes, prefixed with /api/users
app.use("/api/users", userRoutes);

// Simple test route to verify server is running
app.get("/", (req, res) => {
  res.send("API is running....");
});

// ================== SERVER ==================

// Start the server and listen on defined PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
