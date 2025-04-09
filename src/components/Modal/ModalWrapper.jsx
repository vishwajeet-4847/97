import React from "react";
import { X } from "lucide-react";

const ModalWrapper = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === "modal-background") {
      onClose();
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 flex items-start border-4 border-gray-800 justify-center z-50 p-4 md:items-center  shadow-xl "
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-md w-full max-w-md my-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gray-600 text-white flex justify-between items-center p-3 rounded-t-md ">
          <h2 className="text-base font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-full p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
