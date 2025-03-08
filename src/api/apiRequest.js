import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies
});

export default apiRequest;
