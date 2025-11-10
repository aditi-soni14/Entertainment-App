// import express from "express";
// import { registerUser, loginUser } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/signup", registerUser);
// router.post("/login", loginUser);

// export default router;


import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

// Create a router instance
const router = express.Router();

// ================== AUTH ROUTES ==================

// Route for user registration (signup)
// Endpoint: POST /api/users/signup
router.post("/signup", registerUser);

// Route for user login
// Endpoint: POST /api/users/login
router.post("/login", loginUser);

// Export the router to be used in the main app
export default router;
