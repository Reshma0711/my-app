import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});


// Request Interceptor - Attaches Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);