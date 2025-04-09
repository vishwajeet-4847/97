import React, { useState } from 'react';
import { EyeIcon } from 'lucide-react';

const UserStatusManagement = ({setGr}) => {
    
  const [status, setStatus] = useState('active');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="fixed inset-0 p-2 flex  justify-center top-0 z-20">
      <div className="w-full max-w-lg h-[500px] bg-white shadow-lg rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="text-lg font-bold">Change Status</h2>
          <button className="text-xl font-bold" onClick={(e) => {
  e.stopPropagation(); // Prevent event propagation
  setGr(false);
}}>
  &times;
</button>
        </div>
    <div className="max-w-md mx-auto p-4">
      {/* User Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <span className="bg-green-500 text-white px-2 py-1 text-sm font-bold rounded">USER</span>
          <span className="ml-2 font-medium">abhi2453</span>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">active</span>
      </div>

      {/* Status Control Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button 
          className={`border rounded-md p-4 flex flex-col items-center justify-center ${
            status === 'active' ? 'border-green-400' : 'border-gray-300'
          }`}
          onClick={() => handleStatusChange('active')}
        >
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span className="text-green-500">Active</span>
        </button>

        <button 
          className={`border rounded-md p-4 flex flex-col items-center justify-center ${
            status === 'suspend' ? 'border-red-400' : 'border-gray-300'
          }`}
          onClick={() => handleStatusChange('suspend')}
        >
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
          </div>
          <span className="text-red-500">Suspend</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <button 
          className={`border rounded-md p-4 flex flex-col items-center justify-center ${
            status === 'locked' ? 'border-gray-500' : 'border-gray-300'
          }`}
          onClick={() => handleStatusChange('locked')}
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <span className="text-gray-500">Locked</span>
        </button>
      </div>

      {/* Password Field */}
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password.."
          className="w-full p-3 border border-gray-300 rounded-md pr-10"
        />
        <button 
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <EyeIcon size={20} />
        </button>
      </div>

      {/* Change Button */}
      <button className="w-full bg-gray-800 text-white py-3 rounded-md">
        Change
      </button>
    </div>
    </div>
    </div>
  );
};

export default UserStatusManagement;