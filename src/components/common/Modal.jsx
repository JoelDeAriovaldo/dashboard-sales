import React from "react";
import { X } from "lucide-react"; // Importar ícone de X para fechar

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4 relative animate-fade-in dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Fechar modal"
        >
          <X size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
