import React from "react";
import "./PostItem.css";
import { FaBed, FaBath, FaRegBookmark, FaRegCommentDots } from "react-icons/fa";

export default function PostItem({ post }) {
  return (
    <div className="post-item">
      <img src={post.images[0]} alt={post.title} className="post-image" />
      <div className="post-details">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-address">📍 {post.address}</p>

        <div className="post-price">$ {post.price.toLocaleString()}</div>

        <div className="post-features">
          <span className="feature">
            <FaBed /> {post.bedroom} bedroom
          </span>
          <span className="feature">
            <FaBath /> {post.bathroom} bathroom
          </span>
        </div>
      </div>
    </div>
  );
}
