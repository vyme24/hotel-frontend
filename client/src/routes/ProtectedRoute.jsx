import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated && !token) {
    // Redirect to home page but signal to open the login modal
    return <Navigate to="/" state={{ from: location, openLogin: true }} replace />;
  }

  return children;
};

export default ProtectedRoute;
