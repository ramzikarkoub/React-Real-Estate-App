import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import "./Header.css";

export default function Header() {
  const { logout, user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/public/logo.svg" alt="Logo" />
        </Link>
        <Link className="desktop-link-style site-name" to="/">
          <span>Ramzillow</span>
        </Link>
      </div>

      <div className="right">
        <Link className="desktop-link-style" to="/">
          Home
        </Link>
        <Link className="desktop-link-style" to="/rent">
          Rent
        </Link>
        <Link className="desktop-link-style" to="/buy">
          Buy
        </Link>
        {!user ? (
          <>
            <Link className="desktop-link-style" to="/login">
              Login
            </Link>
            <Link className="desktop-link-style" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link className="desktop-link-style" to="/dashboard">
              Dashboard
            </Link>

            <div className="welcome">
              <p>
                Welcome{" "}
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </p>
              <Link onClick={logout} className="logout-button">
                Logout
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ✅ Hamburger Menu Toggle */}
      <div className="hamburger" onClick={toggleMenu}>
        {showMenu ? <FaTimes /> : <FaBars />}
      </div>

      {/* ✅ Mobile Menu */}
      <div className={`mobile-menu ${showMenu ? "active" : ""}`}>
        <Link className="link-style" to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link className="link-style" to="/rent" onClick={closeMenu}>
          Rent
        </Link>
        <Link className="link-style" to="/buy" onClick={closeMenu}>
          Buy
        </Link>
        {!user ? (
          <>
            <Link className="link-style" to="/login" onClick={closeMenu}>
              Login
            </Link>
            <Link className="link-style" to="/register" onClick={closeMenu}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link className="link-style" to="/dashboard" onClick={closeMenu}>
              Dashboard
            </Link>
            <Link className="link-style logout-button" onClick={logout}>
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
