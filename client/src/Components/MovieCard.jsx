import React, { useState } from "react";
import { Bookmark, X } from "lucide-react";

export default function MovieCard({ item, toggleBookmark, bookmarked }) {
  // State to control the visibility of the movie details modal
  const [showDetails, setShowDetails] = useState(false);

  // Check if the current movie is already bookmarked
  const isBookmarked = bookmarked?.some((b) => b.id === item.id);

  return (
    <>
      {/* Card container for movie */}
      <div
        onClick={() => setShowDetails(true)} // Open modal on click
        className="relative group cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        {/* Movie poster with fallback image */}
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={item.title || item.name}
          className="rounded-lg shadow-md"
        />

        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent modal from opening when clicking bookmark
            toggleBookmark(item); // Add or remove movie from bookmarks
          }}
          className="absolute top-2 right-2 bg-black bg-opacity-60 p-2 rounded-full hover:bg-opacity-80"
        >
          {/* Change icon color based on bookmark status */}
          <Bookmark
            size={20}
            className={isBookmarked ? "text-yellow-400" : "text-white"}
            fill={isBookmarked ? "yellow" : "none"}
          />
        </button>

        {/* Movie title and rating */}
        <div className="mt-2 text-center">
          <h3 className="font-semibold text-sm truncate">
            {item.title || item.name}
          </h3>
          <p className="text-xs text-gray-400">
            ⭐ {item.vote_average?.toFixed(1) || "N/A"}
          </p>
        </div>
      </div>

      {/* Modal for showing detailed movie info */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 relative overflow-hidden animate-fadeIn">
            {/* Close modal button */}
            <button
              onClick={() => setShowDetails(false)} // Close modal
              className="absolute top-3 right-3 text-gray-300 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Movie poster inside modal */}
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item.title || item.name}
                className="md:w-1/3 w-full h-full object-cover"
              />

              {/* Movie details section */}
              <div className="p-6 flex flex-col justify-center md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">
                  {item.title || item.name}
                </h2>
                <p className="text-sm text-gray-400 mb-2">
                  ⭐ {item.vote_average?.toFixed(1)} |{" "}
                  {item.release_date || item.first_air_date || "N/A"}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.overview || "No description available."}
                </p>

                {/* Bookmark toggle inside modal */}
                <button
                  onClick={() => toggleBookmark(item)} // Toggle bookmark status
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm self-start"
                >
                  {isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
