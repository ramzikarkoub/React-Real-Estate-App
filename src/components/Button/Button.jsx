import React from "react";
import "./Button.css";

export default function Button({
  children,
  color = "default",
  onClick,
  type = "button",
}) {
  return (
    <button className={`btn btn-${color}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
