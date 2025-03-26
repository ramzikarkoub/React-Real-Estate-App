import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostContext from "../../context/PostContext";
import "./SinglePost.css";
import { FaBed, FaBath } from "react-icons/fa";

export default function SinglePostPage() {
  const { post, loading, message, fetchPostById } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (message) return <p>{message}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="single-post">
      <h1>{post.title}</h1>
      <div className="post-images">
        {post.images.map((image, index) => (
          <img key={index} src={image} alt={post.title} />
        ))}
      </div>
      <p className="post-price">${post.price.toLocaleString()}</p>
      <p>
        <strong>Location:</strong> {post.address}, {post.city}
      </p>
      <p>
        <strong>Type:</strong> {post.type}
      </p>
      <p>
        <strong>Property:</strong> {post.property}
      </p>

      <div className="post-features">
        <span className="post-feature">
          <FaBed /> {post.bedroom} Bedroom
        </span>
        <span className="post-feature">
          <FaBath /> {post.bathroom} Bathroom
        </span>
      </div>

      <p>{post.postDetail.desc}</p>

      {post.postDetail.utilities && (
        <p>
          <strong>Utilities:</strong> {post.postDetail.utilities}
        </p>
      )}
      {post.postDetail.pet && (
        <p>
          <strong>Pet Policy:</strong> {post.postDetail.pet}
        </p>
      )}
      {post.postDetail.size && (
        <p>
          <strong>Size:</strong> {post.postDetail.size} sqft
        </p>
      )}
    </div>
  );
}
