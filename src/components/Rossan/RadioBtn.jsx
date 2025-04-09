import React from 'react';

const RadioBtn = ({isChecked , setIsChecked}) => {
  
  
  return (
    <div className="flex items-center">
      
      <div 
        className={`relative inline-flex h-6 w-12 cursor-pointer rounded-full transition-colors ease-in-out duration-200 ${
          isChecked
            ? "bg-gradient-to-r from-[#00a100] to-[#005500]" 
            : "bg-gradient-to-r from-[#f60105] to-[#801011]" 
        }`}
        onClick={setIsChecked}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`inline-block h-5 w-5 transform rounded-sm transition ease-in-out duration-200 ${
            isChecked 
              ? 'translate-x-6 bg-white' 
              : 'translate-x-1 bg-white border border-gray-300'
          }`}
          style={{
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            marginTop: '2px'
          }}
        />
        {isChecked && (
          <svg 
            className="absolute left-1 top-1 h-4 w-4 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default RadioBtn;