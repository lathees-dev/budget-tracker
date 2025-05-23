import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token && !user) {
      // Simply mark as authenticated (no decoding)
      setUser(true); // or any dummy value to indicate login
    }
    setIsVerified(true);
  }, [user, setUser]);

  if (!isVerified) return null; // or <LoadingScreen />

  if (!Cookies.get("jwt")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
