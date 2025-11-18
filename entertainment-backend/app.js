// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";  // Import MongoDB connection function
// import authRoutes from "./routes/authRoutes.js"; // Import authentication routes


// dotenv.config();


// connectDB();

// const app = express();

// // ================== MIDDLEWARE ==================

// // Enable CORS (Cross-Origin Resource Sharing)
// app.use(cors());

// // Parse incoming JSON requests
// app.use(express.json());

// // ================== ROUTES ==================

// // Auth routes (signup & login) prefixed with /api/auth
// app.use("/api/auth", authRoutes);

// // Simple test route to verify server is running
// app.get("/", (req, res) => res.send("Entertainment App Backend Running"));


// export default app;


/////now 18/11/25

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Import all route files
import authRoutes from "./routes/authRoutes.js";
import bookmarkRoutes from "./routes/Bookmark.js";
import movieRoutes from "./routes/Movie.js";
import tvRoutes from "./routes/TVseries.js";
import userRoutes from "./routes/Userroutes.js";

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