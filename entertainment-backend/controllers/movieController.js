import axios from "axios";
import https from "https";

const agent = new https.Agent({
  keepAlive: true,
  family: 4, 
});

export const getAllMovies = async (req, res) => {
  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

    console.log("Fetching:", url);
    const response = await axios.get(url, { httpsAgent: agent, timeout: 10000 });
    console.log("TMDB Response status:", response.status);

    res.json(response.data.results);
  } catch (error) {
    console.error("TMDB Fetch Error:", error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    res.status(500).json({
      message: "Error fetching movies",
      error: error.message,
    });
  }
};