import React, { useContext, useEffect } from "react";
import PostContext from "../../context/PostContext";
import PostItem from "../../components/PostItem/PostItem";
import "./BuyPage.css";

export default function BuyPage() {
  const { posts, loading, message, fetchPosts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts({ type: "buy" }); // Fetch only properties to buy only (for sale)
  }, []);

  return (
    <div className="home-main">
      <h1>Properties for Sale</h1>
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
