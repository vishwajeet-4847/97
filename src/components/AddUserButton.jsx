import React from "react";
import { FaUserPlus } from "react-icons/fa";

const AddUserButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-md bg-gray-200 text-black font-semibold shadow-md hover:bg-gray-300 transition-all"
    >
      <FaUserPlus className="text-black" />
      Add Master
    </button>
  );
};

export default AddUserButton;