import mongoose from "mongoose";

const tvSeriesSchema = new mongoose.Schema({
  title: String,
  genre: String,
  seasons: Number,
  description: String,
});

export default mongoose.model("TVSeries", tvSeriesSchema);