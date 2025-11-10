import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Get trending movies and TV shows
export const getTrending = async () => {
  const res = await tmdb.get("/trending/all/week");
  return res.data.results;
};

// Get all movies
export const getMovies = async () => {
  const res = await tmdb.get("/movie/popular");
  return res.data.results;
};

// Get all TV series
export const getTVSeries = async () => {
  const res = await tmdb.get("/tv/popular");
  return res.data.results;
};

// Search movies or TV shows
export const searchContent = async (query) => {
  const res = await tmdb.get("/search/multi", {
    params: { query },
  });
  return res.data.results;
};