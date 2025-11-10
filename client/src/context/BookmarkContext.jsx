// import { createContext, useContext, useState } from "react";

// const BookmarkContext = createContext();

// export function BookmarkProvider({ children }) {
//   const [bookmarks, setBookmarks] = useState([]);

//   const toggleBookmark = (item) => {
//     setBookmarks((prev) => {
//       const exists = prev.find((m) => m.id === item.id);
//       if (exists) {
//         return prev.filter((m) => m.id !== item.id);
//       }
//       return [...prev, item];
//     });
//   };

//   return (
//     <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
//       {children}
//     </BookmarkContext.Provider>
//   );
// }

// export function useBookmarks() {
//   return useContext(BookmarkContext);
// }



import { createContext, useContext, useState } from "react";

const BookmarkContext = createContext(); // Create context to share bookmark data

export function BookmarkProvider({ children }) {
  // State to hold the list of bookmarked items
  const [bookmarks, setBookmarks] = useState([]);

  // Function to add or remove an item from bookmarks
  const toggleBookmark = (item) => {
    setBookmarks((prev) => {
      // Check if the item already exists in bookmarks
      const exists = prev.find((m) => m.id === item.id);

      // If it exists, remove it; otherwise, add it
      if (exists) {
        return prev.filter((m) => m.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // Provide bookmark data and toggle function to child components
  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

// Custom hook to easily access the bookmark context
export function useBookmarks() {
  return useContext(BookmarkContext);
}
