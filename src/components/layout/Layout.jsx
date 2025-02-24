import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SearchBar from "../searchBar/SearchBar";
import PostContext from "../../context/PostContext";
import "./Layout.css";

const Layout = () => {
  const { fetchPosts } = useContext(PostContext);

  return (
    <div className="main-layout">
      <Header />
      <main className="main">
        <div className="outlet">
          <Outlet />
        </div>
        <SearchBar onSearch={fetchPosts} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
