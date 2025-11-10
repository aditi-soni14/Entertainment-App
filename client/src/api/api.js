import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

// Interceptor to attach token with every request if available
API.interceptors.request.use((req) => {
  // Get the token stored in localStorage
  const token = localStorage.getItem("token");

  // If token exists, add it to the Authorization header
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  // Return the modified request so it can continue
  return req;
});

export default API;
