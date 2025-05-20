import axios from "axios";

console.log("env variable", import.meta.env.VITE_BACKEND_URL)
const API = axios.create({
  baseURL: "https://budget-tracker-production-55ba.up.railway.app" + "/api",
  withCredentials: true,
});

export default API;
