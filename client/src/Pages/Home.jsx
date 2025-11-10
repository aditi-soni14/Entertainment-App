// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SearchBar from "../Components/SearchBar";
// import MovieCard from "../Components/MovieCard";

// export default function Home({ toggleBookmark, bookmarked }) {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [recentMovies, setRecentMovies] = useState([]);
//   const [trendingTV, setTrendingTV] = useState([]);
//   const [recentTV, setRecentTV] = useState([]);
//   const [query, setQuery] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);

//   const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

//   useEffect(() => {
//     fetchTrending();
//     fetchRecent();
//   }, []);

//   // 🔥 Fetch Trending Movies + TV
//   const fetchTrending = async () => {
//     try {
//       const [moviesRes, tvRes] = await Promise.all([
//         axios.get(
//           `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
//         ),
//         axios.get(
//           `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`
//         ),
//       ]);
//       setTrendingMovies(moviesRes.data.results || []);
//       setTrendingTV(tvRes.data.results || []);
//     } catch (err) {
//       console.error("Error fetching trending data:", err);
//     }
//   };

//   // 🆕 Fetch Recent Movies + TV (latest releases)
//   const fetchRecent = async () => {
//     try {
//       const [moviesRes, tvRes] = await Promise.all([
//         axios.get(
//           `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
//         ),
//         axios.get(
//           `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
//         ),
//       ]);
//       setRecentMovies(moviesRes.data.results || []);
//       setRecentTV(tvRes.data.results || []);
//     } catch (err) {
//       console.error("Error fetching recent data:", err);
//     }
//   };

//   // 🔍 Search functionality
//   const handleSearch = async (searchTerm) => {
//     setQuery(searchTerm);
//     if (!searchTerm.trim()) {
//       fetchTrending();
//       fetchRecent();
//       return;
//     }

//     try {
//       const [movieRes, tvRes] = await Promise.all([
//         axios.get(
//           `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
//         ),
//         axios.get(
//           `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchTerm}`
//         ),
//       ]);
//       setTrendingMovies(movieRes.data.results || []);
//       setTrendingTV(tvRes.data.results || []);
//       setRecentMovies([]);
//       setRecentTV([]);
//     } catch (err) {
//       console.error("Error searching:", err);
//     }
//   };

//   return (
//  <div className="px-4 md:px-8 py-6 text-white">
// {/* //  <div className=" w-full text-white overflow-x-hidden mx-0">  */}
    
//       {/* Header */}
//       <h1 className="text-3xl font-bold mb-4 text-center">
//         🎬 Welcome to Entertainment Hub
//       </h1>

//       {/* Search */}
//       <div className="mb-8 flex justify-center">
//         <SearchBar onSearch={handleSearch} />
//       </div>

//       {/* 🔥 Trending Movies */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
//           🔥 Trending Movies
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {trendingMovies.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => setSelectedItem(item)}
//               className="cursor-pointer"
//             >
//               <MovieCard
//                 item={item}
//                 toggleBookmark={toggleBookmark}
//                 bookmarked={bookmarked}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 🆕 Recent Movies */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
//           🆕 Recent Movies
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {recentMovies.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => setSelectedItem(item)}
//               className="cursor-pointer"
//             >
//               <MovieCard
//                 item={item}
//                 toggleBookmark={toggleBookmark}
//                 bookmarked={bookmarked}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 📺 Trending TV */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
//           📺 Trending TV Series
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {trendingTV.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => setSelectedItem(item)}
//               className="cursor-pointer"
//             >
//               <MovieCard
//                 item={item}
//                 toggleBookmark={toggleBookmark}
//                 bookmarked={bookmarked}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 🆕 Recent TV */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
//           🆕 Recent TV Series
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {recentTV.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => setSelectedItem(item)}
//               className="cursor-pointer"
//             >
//               <MovieCard
//                 item={item}
//                 toggleBookmark={toggleBookmark}
//                 bookmarked={bookmarked}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Description Modal */}
//       {selectedItem && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6">
//           <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl">
//             <button
//               onClick={() => setSelectedItem(null)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//             >
//               ✕
//             </button>
//             <img
//               src={
//                 selectedItem.backdrop_path
//                   ? `https://image.tmdb.org/t/p/w780${selectedItem.backdrop_path}`
//                   : "https://via.placeholder.com/780x439?text=No+Image"
//               }
//               alt={selectedItem.title || selectedItem.name}
//               className="rounded-lg mb-4"
//             />
//             <h2 className="text-2xl font-bold mb-2">
//               {selectedItem.title || selectedItem.name}
//             </h2>
//             <p className="text-yellow-400 mb-1">
//               ⭐ {selectedItem.vote_average?.toFixed(1) || "N/A"}
//             </p>
//             <p className="text-sm text-gray-300 mb-2">
//               📅 {selectedItem.release_date || selectedItem.first_air_date}
//             </p>
//             <p className="text-gray-400 leading-relaxed">
//               {selectedItem.overview || "No description available."}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../Components/SearchBar";
import MovieCard from "../Components/MovieCard";

export default function Home({ toggleBookmark, bookmarked }) {
  // State variables for storing fetched data and UI states
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [recentTV, setRecentTV] = useState([]);
  const [query, setQuery] = useState(""); // Store user search query
  const [selectedItem, setSelectedItem] = useState(null); // Store selected movie/TV for modal

  // TMDB API key (loaded from environment variable)
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTrending();
    fetchRecent();
  }, []);

  //  Fetch trending movies and TV series
  const fetchTrending = async () => {
    try {
      // Run both API calls simultaneously
      const [moviesRes, tvRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`
        ),
      ]);
      // Store the results in state
      setTrendingMovies(moviesRes.data.results || []);
      setTrendingTV(tvRes.data.results || []);
    } catch (err) {
      console.error("Error fetching trending data:", err);
    }
  };

  //  Fetch recently released movies and currently airing TV series
  const fetchRecent = async () => {
    try {
      const [moviesRes, tvRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        ),
        axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
        ),
      ]);
      // Store the results in state
      setRecentMovies(moviesRes.data.results || []);
      setRecentTV(tvRes.data.results || []);
    } catch (err) {
      console.error("Error fetching recent data:", err);
    }
  };

  //  Handle search functionality for movies and TV series
  const handleSearch = async (searchTerm) => {
    setQuery(searchTerm); // Save query for reference
    if (!searchTerm.trim()) {
      // If search is empty, reload trending/recent data
      fetchTrending();
      fetchRecent();
      return;
    }

    try {
      // Run both movie and TV search requests simultaneously
      const [movieRes, tvRes] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchTerm}`
        ),
      ]);
      // Update state with search results
      setTrendingMovies(movieRes.data.results || []);
      setTrendingTV(tvRes.data.results || []);
      // Clear recent data when searching
      setRecentMovies([]);
      setRecentTV([]);
    } catch (err) {
      console.error("Error searching:", err);
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 text-white">
      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-4 text-center">
        🎬 Welcome to Entertainment Hub
      </h1>

      {/* Search bar section */}
      <div className="mb-8 flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/*  Trending Movies Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
          🔥 Trending Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {trendingMovies.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)} // Open modal for selected item
              className="cursor-pointer"
            >
              <MovieCard
                item={item}
                toggleBookmark={toggleBookmark}
                bookmarked={bookmarked}
              />
            </div>
          ))}
        </div>
      </section>

      {/*  Recent Movies Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
          🆕 Recent Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recentMovies.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer"
            >
              <MovieCard
                item={item}
                toggleBookmark={toggleBookmark}
                bookmarked={bookmarked}
              />
            </div>
          ))}
        </div>
      </section>

      {/*  Trending TV Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
          📺 Trending TV Series
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {trendingTV.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer"
            >
              <MovieCard
                item={item}
                toggleBookmark={toggleBookmark}
                bookmarked={bookmarked}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Recent TV Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
          🆕 Recent TV Series
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recentTV.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer"
            >
              <MovieCard
                item={item}
                toggleBookmark={toggleBookmark}
                bookmarked={bookmarked}
              />
            </div>
          ))}
        </div>
      </section>

      {/*  Modal for showing detailed information */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl">
            {/* Close modal button */}
            <button
              onClick={() => setSelectedItem(null)} // Close modal
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* Display movie/TV poster or fallback image */}
            <img
              src={
                selectedItem.backdrop_path
                  ? `https://image.tmdb.org/t/p/w780${selectedItem.backdrop_path}`
                  : "https://via.placeholder.com/780x439?text=No+Image"
              }
              alt={selectedItem.title || selectedItem.name}
              className="rounded-lg mb-4"
            />

            {/* Display selected item details */}
            <h2 className="text-2xl font-bold mb-2">
              {selectedItem.title || selectedItem.name}
            </h2>
            <p className="text-yellow-400 mb-1">
              ⭐ {selectedItem.vote_average?.toFixed(1) || "N/A"}
            </p>
            <p className="text-sm text-gray-300 mb-2">
              📅 {selectedItem.release_date || selectedItem.first_air_date}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {selectedItem.overview || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
