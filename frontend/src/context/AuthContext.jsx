import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      // Assuming the response structure is { _id, username, email, token }
      const { token, ...userData } = res.data;

      // Store token in cookies
      Cookies.set("token", token, { expires: 7 });

      // Set user data
      setUser(userData);

      // Return user data
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      // Assuming the response structure is { _id, username, email, token }
      const { token, ...userData } = res.data;

      // Store token in cookies
      Cookies.set("token", token, { expires: 7 });

      // Set user data
      setUser(userData);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // Assuming the response structure is { _id, username, email }
          setUser(res.data);
        })
        .catch(() => {
          Cookies.remove("token"); // Remove token if there's an error
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
