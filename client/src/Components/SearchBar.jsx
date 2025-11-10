import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  // State to store the user's search input
  const [query, setQuery] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (query.trim() !== "") { // Check if search input is not empty
      onSearch(query); // Pass the search query to parent component
    }
  };

  return (
    // Search form
    <form
      onSubmit={handleSubmit} // Call handleSubmit when user submits the form
      className="mb-6 flex justify-center items-center gap-0"
    >
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search for movies or TV shows..."
        value={query} // Bind input value to state
        onChange={(e) => setQuery(e.target.value)} // Update query as user types
        className="w-2/3 p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Submit button */}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-r-lg font-semibold transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
