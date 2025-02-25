import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  // Wait until checkUserLoggedIn finishes before deciding
  if (isLoading) return null;

  // Redirect to login if user is not authenticated
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
