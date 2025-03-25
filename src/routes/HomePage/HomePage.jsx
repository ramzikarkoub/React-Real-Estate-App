import React, { useContext, useEffect } from "react";
import PostContext from "../../context/PostContext";
import "./HomePage.css";
import PostItem from "../../components/PostItem/PostItem";

export default function HomePage() {
  const { posts, loading, message, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts(); // Display all posts on page load
  }, []);
  return (
    <div className="home-main">
      <h1>Explore All Properties</h1>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <div className="posts-container">
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
