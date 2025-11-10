import React from "react";

export default function Bookmarks({ bookmarked, toggleBookmark }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Bookmarked Shows</h1>

      {/* If no items are bookmarked, show a message */}
      {bookmarked.length === 0 ? (
        <p className="text-gray-400 text-lg">No bookmarks yet 😔</p>
      ) : (
        // Display grid of bookmarked items
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {bookmarked.map((item) => (
            <div
              key={item.id} // Unique key for each bookmarked item
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              {/* Show the movie/show poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-64 object-cover"
              />

              {/* Show title and remove button */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {item.title || item.name}
                </h3>

                {/* Remove item from bookmarks when clicked */}
                <button
                  onClick={() => toggleBookmark(item)}
                  className="text-red-400 hover:text-red-300 text-sm mt-1"
                >
                  ❌ Remove Bookmark
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
