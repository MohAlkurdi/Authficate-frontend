import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/api",
  withCredentials: false,
});

// Function to retrieve the user's token from local storage
const getToken = () => {
  return localStorage.getItem("token"); // Adjust the key as needed
};

// Add an interceptor to include the token in the request headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
