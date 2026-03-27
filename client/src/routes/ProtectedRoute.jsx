import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isTokenExpired } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !token || isTokenExpired(token)) {
    return (
      <Navigate
        to="/auth/login"
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
          message: "Please login first to continue",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
