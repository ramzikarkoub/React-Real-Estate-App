import React from "react";
import "./Modal.css";

export default function Modal({ children, onClose }) {
  const handleOverlayClick = () => {
    onClose();
  };
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        {children}
        <button className="modal-close" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
}
