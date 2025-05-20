import axios from "axios";

const API = axios.create({
  baseURL: "https://budget-tracker-production-55ba.up.railway.app/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
