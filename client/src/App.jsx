import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import TVSeries from "./Pages/TVSeries";
import Bookmarks from "./Pages/Bookmarks";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  // State to store bookmarked items, initialized from localStorage
  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem("bookmarked");
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage whenever bookmarks change
  useEffect(() => {
    localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
  }, [bookmarked]);

  // Toggle a bookmark on/off
  const toggleBookmark = (item) => {
    setBookmarked((prev) => {
      const isBookmarked = prev.some((b) => b.id === item.id);
      // If already bookmarked, remove it; otherwise, add it
      return isBookmarked
        ? prev.filter((b) => b.id !== item.id)
        : [...prev, item];
    });
  };

  return (
    // Main container styling
    <div className="bg-gray-900 min-h-screen text-white font-sans py-6">
      {/* Navbar always visible */}
      <Navbar />

      {/* Main content area */}
      <main className="w-full px-0 py-0">
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes (require authentication) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home toggleBookmark={toggleBookmark} bookmarked={bookmarked} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies
                  toggleBookmark={toggleBookmark}
                  bookmarked={bookmarked}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv"
            element={
              <ProtectedRoute>
                <TVSeries
                  toggleBookmark={toggleBookmark}
                  bookmarked={bookmarked}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks
                  toggleBookmark={toggleBookmark}
                  bookmarked={bookmarked}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
