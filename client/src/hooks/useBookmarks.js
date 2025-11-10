// import { useState } from "react";

// export function useBookmarks() {
//   const [bookmarks, setBookmarks] = useState([]);

//   const toggleBookmark = (movie) => {
//     setBookmarks((prev) => {
//       const isAlready = prev.find((m) => m.id === movie.id);
//       if (isAlready) {
//         return prev.filter((m) => m.id !== movie.id);
//       } else {
//         return [...prev, movie];
//       }
//     });
//   };

//   return { bookmarks, toggleBookmark };
// }



import { useState } from "react";

export function useBookmarks() {
  // State to store the list of bookmarked movies
  const [bookmarks, setBookmarks] = useState([]);

  // Function to add or remove a movie from bookmarks
  const toggleBookmark = (movie) => {
    setBookmarks((prev) => {
      // Check if the movie already exists in the bookmarks
      const isAlready = prev.find((m) => m.id === movie.id);

      // If it exists, remove it from the list; otherwise, add it
      if (isAlready) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  // Return the current bookmarks and the toggle function
  return { bookmarks, toggleBookmark };
}
