import express from "express";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";

const router = express.Router();

// ================== BOOKMARK ROUTES ==================
// All routes prefixed with /api/bookmark in app.js

// Add a new bookmark
// Endpoint: POST /api/bookmark/add
router.post("/add", addBookmark);

// Get bookmarks for a specific user
// Endpoint: GET /api/bookmark/:userId
router.get("/:userId", getBookmarks);

// Remove a bookmark
// Endpoint: DELETE /api/bookmark/remove
router.delete("/remove", removeBookmark);

export default router;