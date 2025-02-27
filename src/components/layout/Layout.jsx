import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SearchBar from "../searchBar/SearchBar";
import PostContext from "../../context/PostContext";
import UserContext from "../../context/UserContext";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const { fetchPosts } = useContext(PostContext);
  const { fetchUserPosts, user } = useContext(UserContext);

  const handleSearch =
    location.pathname === "/dashboard" ? fetchUserPosts : fetchPosts;
  console.log(user);
  return (
    <div className="main-layout">
      <Header />
      <main className="main">
        <div className="outlet">
          <Outlet />
        </div>
        {!(location.pathname === "/login") &&
          !(location.pathname === "/register") && (
            <SearchBar onSearch={handleSearch} />
          )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
