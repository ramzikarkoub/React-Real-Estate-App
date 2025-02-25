import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Header() {
  const { logout, user } = useContext(UserContext);
  console.log(user);
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/public/logo.svg" alt="" />
        </Link>
        <Link to="/" className="site-name">
          <span>Ramzillow</span>
        </Link>
      </div>
      <div className="right">
        <Link to="/">Home</Link>
        <Link to="/rent">Rent</Link>
        <Link to="/buy">Buy</Link>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <div className="logout">
              <p to="/dashboard">
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </p>
              <Link onClick={logout} className="logout-button">
                Logout
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
