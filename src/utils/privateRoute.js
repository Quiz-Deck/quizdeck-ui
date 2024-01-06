import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticatedUser } from "./Auth";

const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticatedUser();
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
