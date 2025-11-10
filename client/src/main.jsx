import { StrictMode } from "react"; // Helps highlight potential problems in the app
import { createRoot } from "react-dom/client"; // React 18+ root API
import { BrowserRouter } from "react-router-dom"; // Enables routing in the app
import { BookmarkProvider } from "./context/BookmarkContext.jsx"; // Provides global bookmark context
import App from "./App.jsx"; // Main App component
import "./index.css"; // Global CSS styles

// Create the root for React 18+ rendering
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter wraps the app to enable routing */}
    <BrowserRouter>
      {/* BookmarkProvider provides context for managing bookmarks globally */}
      <BookmarkProvider>
        {/* Main App component */}
        <App />
      </BookmarkProvider>
    </BrowserRouter>
  </StrictMode>
);
