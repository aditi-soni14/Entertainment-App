import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../Components/MovieCard";

export default function TVSeries({ toggleBookmark, bookmarked }) {
  // State to store fetched TV series
  const [tvSeries, setTvSeries] = useState([]);
  // State to store available TV genres
  const [genres, setGenres] = useState([]);

  // TMDB API key from environment variables
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // useEffect to fetch popular TV shows and genres when component mounts
  useEffect(() => {
    fetchPopularTV();
    fetchGenres();
  }, []);

  // Fetch trending/popular TV shows
  const fetchPopularTV = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
      );
      setTvSeries(res.data.results || []); // Save results to state
    } catch (err) {
      console.error("Error fetching TV series:", err); // Log errors
    }
  };

  // Fetch genre list for TV shows
  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`
      );
      setGenres(res.data.genres || []); // Save genres to state
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  // Fetch shows by selected genre
  const fetchByGenre = async (genreId) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`
      );
      setTvSeries(res.data.results || []); // Update state with filtered shows
    } catch (err) {
      console.error("Error fetching shows by genre:", err);
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        📺 Explore Popular TV Series
      </h1>

      {/* Genre Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => fetchByGenre(genre.id)} // Fetch shows by genre
            className="bg-gray-700 hover:bg-indigo-600 px-4 py-2 rounded-full text-sm transition-all"
          >
            {genre.name}
          </button>
        ))}
        {/* Button to reset filter and show all popular TV shows */}
        <button
          onClick={fetchPopularTV}
          className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-full text-sm transition-all"
        >
          All
        </button>
      </div>

      {/* Grid of TV shows */}
      {tvSeries.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tvSeries.map((item) => (
            <MovieCard
              key={item.id}
              item={item} // Pass TV show data to MovieCard
              toggleBookmark={toggleBookmark} // Pass bookmark handler
              bookmarked={bookmarked} // Pass bookmarked state
            />
          ))}
        </div>
      ) : (
        // Message if no TV shows are found
        <p className="text-gray-400 text-center mt-10">
          No TV series found for this genre.
        </p>
      )}
    </div>
  );
}
