import React, { createContext, useContext, useState } from "react";
// import axios from "axios";
import apiRequest from "../api/apiRequest";
import UserContext from "../context/UserContext";
const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // Single post state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { checkUserLoggedIn } = useContext(UserContext);
  const fetchPosts = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiRequest.get(`posts?${params}`);
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
      const response = await apiRequest.get(`/posts/${id}`);
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

  const addPost = async (formData) => {
    try {
      await apiRequest.post("/posts", formData);
      checkUserLoggedIn(); // Refresh user state
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePost = async (id, formData) => {
    try {
      await apiRequest.put(`/posts/${id}`, formData);
      checkUserLoggedIn(); // Refresh user state
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await apiRequest.delete(`/posts/${id}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        loading,
        message,
        fetchPosts,
        fetchPostById,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
