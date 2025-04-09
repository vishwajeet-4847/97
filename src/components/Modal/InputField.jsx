import React from "react";

const InputField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  type = "text", 
  required = false 
}) => (
  <div className="mb-[6px] text-right flex flex-wrap -mt-0 -mr-3 -ml-3 md:flex-row md:items-center">
    {/* Label Section */}
    <label className="font-bold text-[12px] mt-[5px] md:w-[41.6667%] md:flex-none">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    {/* Input Section */}
    <div className="w-full md:w-[58.3333%]"> 
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`${label}..`}
        className="w-full px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded focus:outline-none"
        required={required} // Adds required attribute for validation
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  </div>
);

export default InputField;
