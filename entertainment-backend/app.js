import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Import all route files
import authRoutes from "./routes/authRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import tvRoutes from "./routes/tvSeriesRoutes.js";
import userRoutes from "./routes/userroutes.js";

dotenv.config();
connectDB();

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== ROUTES ==================
app.use("/api/auth", authRoutes);        // Auth routes
app.use("/api/bookmark", bookmarkRoutes); // Bookmark routes
app.use("/api/movie", movieRoutes);     // Movie routes
app.use("/api/tvseries", tvRoutes);     // TV Series routes
app.use("/api/user", userRoutes);       // User routes

// Simple test route
app.get("/", (req, res) => res.send("Entertainment App Backend Running"));

export default app;