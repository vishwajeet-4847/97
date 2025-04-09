import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordField = ({ label, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-[6px] text-right flex flex-wrap -mt-0 -mr-3 -ml-3 md:flex-row md:items-center">
      {/* Label Section */}
      <label className="font-bold text-[12px] mt-[5px] md:w-[41.6667%] md:flex-none  ">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Input Field Section */}
      <div className="relative w-full md:w-[58.3333%]">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`${label}..`}
          className="w-full px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded focus:outline-none"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1 md:col-span-2">{error}</p>}
    </div>
  );
};

export default PasswordField;
