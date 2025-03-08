import React, { createContext, useEffect, useState } from "react";
import apiRequest from "../api/apiRequest";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserLoggedIn = async () => {
    try {
      setIsLoading(true); //
      const response = await apiRequest.get("/auth/me");
      console.log("User authentication response:", response);
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const login = async (formData, navigate) => {
    try {
      const response = await apiRequest.post("/auth/login", formData);
      setUser(response.data);
      setMessage("");
      await fetchUserPosts();
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (formData, navigate) => {
    try {
      const response = await apiRequest.post("/auth/register", formData);
      setUser(response.data.user);
      setMessage("");
      await fetchUserPosts();
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      setUser(null);
      setUserPosts([]);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const fetchUserPosts = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      console.log(params);
      const response = await apiRequest.get(`posts/user?${params}`);
      setUserPosts(response.data || []);
    } catch (error) {
      setUserPosts([]);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        message,
        userPosts,
        fetchUserPosts,
        checkUserLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
