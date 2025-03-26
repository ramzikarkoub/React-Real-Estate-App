import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import PostContext from "../../context/PostContext";
import PostItem from "../../components/PostItem/PostItem";
import Modal from "../../components/Modal/Modal";
import PostForm from "../../components/PostForm/PostForm";
import "./Dashboard.css";
import Button from "../../components/Button/Button";

export default function Dashboard() {
  const { user, userPosts, fetchUserPosts } = useContext(UserContext);
  const { addPost, updatePost, deletePost } = useContext(PostContext);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (post) => {
    setEditData(post);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    if (editData) {
      await updatePost(editData._id, formData);
    } else {
      await addPost(formData);
    }
    await fetchUserPosts(); // Refresh posts after add or update
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      await fetchUserPosts(); // Refresh posts after delete
    }
  };

  return (
    <div className="dashboard">
      <div className="listing-header">
        <h1>
          {user?.username.charAt(0).toUpperCase() + user.username.slice(1)}'s
          Listings
        </h1>
        <Button color="green" onClick={handleAdd}>
          + Add Listing
        </Button>
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <PostForm
            onSubmit={handleSubmit}
            initialData={editData}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}

      <div className="posts-container">
        {!userPosts && <p>Loading...</p>}
        {Array.isArray(userPosts) && userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post._id)}
            />
          ))
        ) : (
          <p>No listing...</p>
        )}
      </div>
    </div>
  );
}
