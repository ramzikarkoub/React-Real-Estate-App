import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPosts = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      console.log(params);
      const response = await axios.get(
        `http://localhost:4000/api/posts?${params}`
      );
      console.log(response.data);
      // Ensure posts is always an array
      if (Array.isArray(response.data)) {
        setPosts(response.data);
        setMessage("");
      } else {
        setPosts([]);
        setMessage(response.data.message || "No properties found.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setMessage("Failed to fetch properties. Please try again.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, message, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
