import { Navigate } from "react-router-dom";
import { useAppContext } from "../../provider/AppProvider";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAppContext();

  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - loading:", loading);
  if (loading) {
    console.log("Still loading...");
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
