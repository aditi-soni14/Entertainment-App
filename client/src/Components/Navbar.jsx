
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // 🔍 Check token on load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [location]);

//   // 🚪 Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Movies", path: "/movies" },
//     { name: "TV Series", path: "/tv" },
//     { name: "Bookmarks", path: "/bookmarks" },
//   ];

//   return (
//     // <nav className="bg-gray-950 shadow-md sticky top-0 z-50 border-b border-gray-800">
//     //   <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//     <nav className="bg-gray-950 shadow-md sticky top-0 z-50 border-b border-gray-800 w-full">
//   <div className="w-full px-6 py-4 flex justify-between items-center">

//         {/* 🎬 Logo */}
//         <h1 className="text-2xl font-extrabold text-red-500 tracking-wide">
//           🎬 MovieVerse
//         </h1>

//         {/* 🔗 Navigation Links */}
//         <div className="flex space-x-8 text-gray-300">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`hover:text-red-400 transition ${
//                 location.pathname === item.path
//                   ? "text-red-500 font-semibold"
//                   : ""
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>

//         {/* 🔐 Auth Buttons */}
//         <div className="flex items-center space-x-4">
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 to="/login"
//                 className={`text-gray-300 hover:text-red-400 transition ${
//                   location.pathname === "/login"
//                     ? "text-red-500 font-semibold"
//                     : ""
//                 }`}
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/signup"
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation(); // Get current route location
  const navigate = useNavigate(); // Navigation hook to redirect programmatically
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // 🔍 Check token on load or when route changes
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, [location]); // Runs whenever the route changes

  // 🚪 Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove saved token
    setIsLoggedIn(false); // Update login state
    navigate("/login"); // Redirect user to login page
  };

  // Navigation links for different pages
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Series", path: "/tv" },
    { name: "Bookmarks", path: "/bookmarks" },
  ];

  return (
    // Navbar container (fixed at top)
    <nav className="bg-gray-950 shadow-md sticky top-0 z-50 border-b border-gray-800 w-full">
      <div className="w-full px-6 py-4 flex justify-between items-center">

        {/* 🎬 Logo */}
        <h1 className="text-2xl font-extrabold text-red-500 tracking-wide">
          🎬 MovieVerse
        </h1>

        {/* 🔗 Navigation Links */}
        <div className="flex space-x-8 text-gray-300">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path} // Navigate to the corresponding route
              className={`hover:text-red-400 transition ${
                location.pathname === item.path // Highlight active link
                  ? "text-red-500 font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* 🔐 Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              {/* Login link */}
              <Link
                to="/login"
                className={`text-gray-300 hover:text-red-400 transition ${
                  location.pathname === "/login"
                    ? "text-red-500 font-semibold"
                    : ""
                }`}
              >
                Login
              </Link>

              {/* Signup button */}
              <Link
                to="/signup"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            // Logout button (only shown when logged in)
            <button
              onClick={handleLogout} // Trigger logout logic
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
