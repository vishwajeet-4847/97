import React from 'react';

const TabSwitcher = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap bg-[#e2e2e2]  mb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 ${
            activeTab === tab ? 'bg-white border-t border-gray-200 border-l rounded-sm border-r font-bold' : 'bg-gray-200'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
