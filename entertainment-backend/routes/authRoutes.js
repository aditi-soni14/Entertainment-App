import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

// Create a router instance
const router = express.Router();

// ================== AUTH ROUTES ==================
// All routes prefixed with /api/auth in app.js

// Route for user registration (signup)
// Endpoint: POST /api/auth/signup
router.post("/signup", registerUser);

// Route for user login
// Endpoint: POST /api/auth/login
router.post("/login", loginUser);

// Export the router to be used in the main app
export default router;