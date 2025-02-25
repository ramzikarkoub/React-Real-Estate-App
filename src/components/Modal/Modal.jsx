import React from "react";
import "./Modal.css";

export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
}
