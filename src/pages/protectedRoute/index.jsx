// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ children }) => {


    
  const token = localStorage.getItem("token");

  if (!token) {
    // No token → redirect to login
    return <Navigate to="/admin_login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now(); // exp is in seconds, convert to ms
    if (isExpired) {
      localStorage.removeItem("token");
      return <Navigate to="/admin_login" replace />;
    }
  } catch (error) {
    // Invalid token → redirect to login
    localStorage.removeItem("token");
    return <Navigate to="/admin_login" replace />;
  }

  // Token valid → allow access
  return children;
};

export default ProtectedRoute;
