import React, { useContext, useEffect } from "react";
import PostContext from "../../context/PostContext";
import "./RentPage.css";
import PostItem from "../../components/postItem/PostItem";

export default function RentPage() {
  const { posts, loading, message, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts({ type: "rent" }); // Fetch only properties for rent only
  }, []);

  return (
    <div className="home-main">
      <h1>Properties for Rent</h1>
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
