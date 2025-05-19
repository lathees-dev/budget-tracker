import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    setUser(res.data);
    return res.data; // 👈 return this so caller can act
  };
  

  const register = async (formData) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData,
      { withCredentials: true }
    );
    setUser(res.data.user);
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
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
