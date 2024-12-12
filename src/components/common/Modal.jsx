import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in overflow-y-auto p-4"
      onClick={onClose}
    >
      <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center py-8">
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-2xl w-full mx-auto relative animate-fade-in dark:text-white max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="sticky top-4 float-right p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
          <div className="overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
