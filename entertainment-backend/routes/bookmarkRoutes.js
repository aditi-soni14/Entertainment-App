import express from "express";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";

const router = express.Router();

// Add bookmark
router.post("/add", addBookmark);

// Get bookmarks for user
router.get("/:userId", getBookmarks);

// Remove bookmark
router.delete("/remove", removeBookmark);

export default router; 