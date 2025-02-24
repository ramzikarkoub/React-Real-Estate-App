// home/HomePage.jsx
import React, { useState } from "react";
import data from "../../assets/fake_posts";
import "./HomePage.css";
import PostItem from "../../components/postItem/PostItem";

export default function HomePage() {
  const [posts] = useState(data);

  return (
    <div className="home-main">
      <h1>Explore Properties</h1>
      <div className="posts-container">
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
