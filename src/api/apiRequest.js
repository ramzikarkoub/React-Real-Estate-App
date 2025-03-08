import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies
});

export default apiRequest;

// import axios from "axios";

// const apiRequest = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/",
//   withCredentials: true, // send cookies
// });

// export default apiRequest;
