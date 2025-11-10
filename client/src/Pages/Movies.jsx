
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../Components/MovieCard";

export default function Movies({ toggleBookmark, bookmarked }) {
  const [movies, setMovies] = useState([]); // Stores the list of movies to display
  const [genres, setGenres] = useState([]); // Stores the list of movie genres

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch popular movies and genres on component mount
  useEffect(() => {
    fetchPopularMovies();
    fetchGenres();
  }, []);

  // Fetch popular movies
  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(res.data.results || []); // Set movies state with results
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  // Fetch all movie genres
  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      setGenres(res.data.genres || []); // Set genres state with results
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  // Fetch movies by selected genre
  const fetchByGenre = async (genreId) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      );
      setMovies(res.data.results || []); // Update movies state with filtered results
    } catch (err) {
      console.error("Error fetching genre movies:", err);
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 text-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎞️ Explore Popular Movies
      </h1>

      {/* Genre Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => fetchByGenre(genre.id)}
            className="bg-gray-700 hover:bg-indigo-600 px-4 py-2 rounded-full text-sm transition-all"
          >
            {genre.name}
          </button>
        ))}
        <button
          onClick={fetchPopularMovies} // Reset to all popular movies
          className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-full text-sm transition-all"
        >
          All
        </button>
      </div>

      {/* Movies Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              toggleBookmark={toggleBookmark}
              bookmarked={bookmarked}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">
          No movies found for this genre.
        </p>
      )}
    </div>
  );
}
