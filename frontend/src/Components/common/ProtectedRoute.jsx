import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Check if the user is authenticated
  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if the user is authenticated
  return children;
};

export default ProtectedRoute;
