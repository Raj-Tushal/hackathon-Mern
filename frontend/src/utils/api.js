import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8005/api", 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;