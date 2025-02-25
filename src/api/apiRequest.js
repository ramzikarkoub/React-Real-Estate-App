import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // Allow cookies to be sent with requests
});

export default axiosInstance;
