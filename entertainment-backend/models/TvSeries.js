import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: String,
  movieId: String, 
});

export default mongoose.model("Bookmark", bookmarkSchema);