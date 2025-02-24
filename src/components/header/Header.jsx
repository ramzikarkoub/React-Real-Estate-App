import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
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
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
