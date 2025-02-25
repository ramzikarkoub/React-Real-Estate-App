import React, { createContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [userPosts, setUserPosts] = useState([]); // State for user posts

  // Function to fetch user posts
  const fetchUserPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/posts/user", {
        withCredentials: true,
      });
      setUserPosts(response.data || []);
    } catch (error) {
      console.error(
        "💥 Error fetching user posts:",
        error.message,
        error.stack
      );
      setUserPosts([]);
    }
  };

  const login = async (formData, navigate) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
      setMessage("");
      await fetchUserPosts(); // Fetch posts after login
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (formData, navigate) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user); // Set user after registration
      setMessage("");
      await fetchUserPosts(); // Fetch posts immediately after registration
      navigate("/dashboard"); // Navigate to Dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setUserPosts([]); // Clear user posts on logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        message,
        userPosts,
        fetchUserPosts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
