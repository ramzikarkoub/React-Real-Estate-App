import React, { createContext, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // Single post state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPosts = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `http://localhost:4000/api/posts?${params}`
      );
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

  const fetchPostById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/posts/${id}`);
      setPost(response.data);
      setMessage("");
    } catch (error) {
      console.error("Error fetching post:", error);
      setMessage("Failed to fetch post. Please try again.");
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, post, loading, message, fetchPosts, fetchPostById }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
