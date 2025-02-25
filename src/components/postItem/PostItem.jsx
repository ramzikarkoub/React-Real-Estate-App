import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./PostItem.css";
import { FaBed, FaBath } from "react-icons/fa";

export default function PostItem({ post, onEdit, onDelete }) {
  const { user } = useContext(UserContext);
  const handleEditClick = (e) => {
    e.preventDefault();
    onEdit(post);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete(post._id);
  };

  return (
    <div className="post-item">
      <Link to={`/${post._id}`} className="post-item-link">
        <img src={post.images[0]} alt={post.title} className="post-image" />
      </Link>
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
          {user && user._id === post.userId._id && (
            <div className="buttons">
              <button className="button-edit" onClick={handleEditClick}>
                Edit
              </button>
              <button className="button-delete" onClick={handleDeleteClick}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
