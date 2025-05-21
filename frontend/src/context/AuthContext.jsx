// context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import API from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    try {
      const res = await API.post(
        "/auth/login", formData,
      );

      const { token, ...userData } = res.data; // Destructure token and the rest as userData
      Cookies.set("token", token, { expires: 7 });
      setUser(userData);
      console.log("login user data", userData);
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const register = async (formData) => {
    try {
      const res = await API.post("/auth/register", formData, {
        withCredentials: false,
      });

      const { token, ...userData } = res.data; // Destructure token and the rest as userData
      Cookies.set("jwt", token, { expires: 7 });
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
        .get("/auth/me", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("use effect user", res.data);
          setUser(res.data);
        })
        .catch(() => {
          Cookies.remove("token");
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user,setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
