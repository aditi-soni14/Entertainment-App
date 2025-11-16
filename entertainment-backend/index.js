// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import userRoutes from "./routes/userRoutes.js";
// import connectDB from "./config/db.js";

// // Load environment variables
// dotenv.config();

// const app = express();

// // ================== MIDDLEWARE ==================
// app.use(cors());
// app.use(express.json());

// // ================== DATABASE ==================
// connectDB();

// // ================== ROUTES ==================
// app.use("/api/users", userRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is running....");
// });


// // export default app;
// // ================== SERVER START ==================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import tvSeriesRoutes from "./routes/tvSeriesRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js"

import connectDB from "./config/db.js";


// Load environment variables
dotenv.config();
console.log("TMDB API KEY from env:",process.env.TMDB_API_KEY)
const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== DATABASE ==================
connectDB(); 

// ================== ROUTES ==================
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/tvseries", tvSeriesRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));