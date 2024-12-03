import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
