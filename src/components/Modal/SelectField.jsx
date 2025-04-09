import React from "react";

const SelectField = ({ label, name, value, onChange, options, error }) => {
  // Remove the console.log that might cause issues
  console.log(options);

  return (
    <div className="mb-[6px] text-right flex flex-wrap -mt-0 -mr-3 -ml-3 md:flex-row md:items-center">
      {/* Label Section */}
      <label className="font-bold text-[12px] mt-[5px] md:w-[41.6667%] md:flex-none ">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Select Dropdown Section */}
      <div className="w-full md:w-[58.3333%] relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded focus:outline-none appearance-none"
        >
          <option value="">Select {label}</option>
          {options && options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="hover:bg-gray-200"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1 md:col-span-2">{error}</p>}
    </div>
  );
};

export default SelectField;