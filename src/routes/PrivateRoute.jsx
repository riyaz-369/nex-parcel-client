import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) return children;

  if (loading) return <LoadingSpinner />;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
