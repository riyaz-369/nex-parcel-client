import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useUser from "../hooks/useUser";

const AdminRoute = ({ children }) => {
  const { role, userLoading } = useUser();
  const location = useLocation();

  if (userLoading) return <LoadingSpinner />;

  if (role === "Admin") return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
