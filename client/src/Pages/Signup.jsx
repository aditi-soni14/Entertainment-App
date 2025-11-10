
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // Form state for username, email, and password
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Stores any error message

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error

    try {
      // Send POST request to register user
      const res = await axios.post("http://localhost:5000/api/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup success:", res.data);
      alert("Signup successful! You can now log in.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login page */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
