import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token found, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the requested page
  return children;
};

export default ProtectedRoute;


