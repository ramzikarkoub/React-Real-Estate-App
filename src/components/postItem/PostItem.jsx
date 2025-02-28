import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import "./PostItem.css";
import { FaBed, FaBath } from "react-icons/fa";
import { GiResize } from "react-icons/gi";
import Button from "../Button/Button";

export default function PostItem({ post, onEdit, onDelete }) {
  const { user } = useContext(UserContext);
  const handleEditClick = (e) => {
    e.preventDefault();
    onEdit(post);
  };
  const location = useLocation();
  const page = location.pathname === "/dashboard";

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDelete(post._id);
  };
  console.log(post);

  return (
    <div className="post-item">
      <Link to={`/${post._id}`} className="post-item-link">
        <img src={post.images[0]} alt={post.title} className="post-image" />
      </Link>
      <div className="post-details">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-address">📍 {post.address}</p>

        <div className="post-price">
          <p className="price-txt">$ {post.price.toLocaleString()}</p>
        </div>

        <div className={`${!page ? "haha" : ""} post-features`}>
          <span className="feature">
            <FaBed /> {post.bedroom} bedroom
          </span>
          <span className="feature">
            <FaBath /> {post.bathroom} bathroom
          </span>

          <span className="feature">
            <GiResize />
            {post.postDetail.size} sq ft
          </span>
          {user && user._id === post.userId._id && (
            <div className="buttons">
              <Button color="blue" onClick={handleEditClick}>
                Edit
              </Button>
              <Button color="red" onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
