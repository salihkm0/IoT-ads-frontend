// import React from "react";
// import { Navigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, token } = useAuthStore();

//   // Check if the user is authenticated
//   if (!isAuthenticated || !token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isTokenExpired, logout ,token} = useAuthStore();

  if (!isAuthenticated || isTokenExpired() || !token) {
    logout()
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
