import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getAllTVSeries = async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  console.log(" TV Series API Key:", apiKey);

  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
  console.log("Fetching:", url);

  try {
    const response = await axios.get(url, {
      timeout: 10000, 
      validateStatus: false,
    });

    if (response.status !== 200) {
      console.error("TMDB returned status:", response.status);
      return res.status(response.status).json({
        message: "TMDB API Error",
        status: response.status,
        data: response.data,
      });
    }

    console.log("TMDB TV Response status:", response.status);
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching TV series:", error.message);
    res.status(500).json({
      message: "Error fetching TV series",
      error: error.message,
    });
  }
};