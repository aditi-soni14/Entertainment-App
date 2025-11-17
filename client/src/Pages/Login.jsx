// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate(); // Used to redirect user after login

//   // Form data state to store user input
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // Error state to display login errors
//   const [error, setError] = useState("");

//   // Handle login form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form reload
//     setError(""); // Clear previous error messages

//     try {
//       // Send login credentials to backend
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       console.log("Login success:", res.data);

//       // Show success alert and store token locally
//       alert("Login successful!");
//       localStorage.setItem("token", res.data.token);

//       // Redirect to home page after successful login
//       navigate("/home");
//     } catch (err) {
//       // Log and display error messages from backend or network
//       console.error("Login error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//       <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

//         {/* Display error message if login fails */}
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         {/* Login form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email Field */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, [e.target.name]: e.target.value })
//             } // Update form state dynamically
//             className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />

//           {/* Password Field */}
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, [e.target.name]: e.target.value })
//             } // Update form state dynamically
//             className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded-lg font-semibold"
//           >
//             Log In
//           </button>
//         </form>

//         {/* Signup link for new users */}
//         <p className="text-sm text-center mt-4">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-indigo-400 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
//now change

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api"; // Import the API

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login success:", res.data);
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded-lg font-semibold"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}