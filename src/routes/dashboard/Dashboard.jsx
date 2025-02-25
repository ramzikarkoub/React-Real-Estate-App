import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import PostItem from "../../components/postItem/PostItem";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, userPosts, fetchUserPosts } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  return (
    <div className="dashboard">
      <div className="listing-header">
        <h1>{user?.username}'s Listings</h1>
        <button
          className="button-edit"
          onClick={() => setShowForm((prev) => !prev)}
        >
          Add Listing
        </button>
      </div>
      <div className="posts-container">
        <p>{showForm && "hahahaha"}</p>
        {Array.isArray(userPosts) && userPosts.length > 0 ? (
          userPosts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>
    </div>
  );
}
