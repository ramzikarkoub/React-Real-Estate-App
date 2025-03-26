import React, { useContext, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar.jsx";
import PostContext from "../../context/PostContext";
import UserContext from "../../context/UserContext";
import Nav from "../Nav/Nav.jsx";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const { fetchPosts } = useContext(PostContext);
  const { fetchUserPosts, user } = useContext(UserContext);

  // Determine if the current page should be centered
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Determine the appropriate search function
  const handleSearch = useMemo(
    () => (location.pathname === "/dashboard" ? fetchUserPosts : fetchPosts),
    [location.pathname, fetchUserPosts, fetchPosts]
  );

  return (
    <div className="main-layout">
      <Nav />
      <main className={`main ${isAuthPage ? "main-center" : ""}`}>
        <div className={`outlet ${isAuthPage ? "outlet-center" : ""}`}>
          <Outlet />
        </div>
        {!isAuthPage && <SearchBar onSearch={handleSearch} />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
