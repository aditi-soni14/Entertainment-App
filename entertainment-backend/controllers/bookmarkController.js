import Bookmark from "../models/Bookmark.js";
export const addBookmark = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({ message: "Missing userId or movieId" });
    }

    const already = await Bookmark.findOne({ userId, movieId });
    if (already) {
      return res.status(400).json({ message: "Already bookmarked" });
    }

    const saved = await Bookmark.create({ userId, movieId });

    res.status(201).json({
      message: "Bookmark added successfully!",
      bookmark: saved,
    });
  } catch (error) {
    console.error("Error adding bookmark:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL BOOKMARKS FOR A USER
export const getBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookmarks = await Bookmark.find({ userId });

    res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE BOOKMARK
export const removeBookmark = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    const removed = await Bookmark.findOneAndDelete({ userId, movieId });

    if (!removed) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.status(200).json({ message: "Bookmark removed successfully!" });
  } catch (error) {
    console.error("Error removing bookmark:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};