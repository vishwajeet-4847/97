import React from "react";

const DashBoard = () => {
  return (
    <div className="min-h-screen p-5 bg-gray-100">
      {/* Dashboard Layout */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Live Sports Profit */}
        <div className="flex flex-col w-full sm:w-[400px] md:w-[450px] border border-gray-400 rounded-t-2xl">
          <div className="font-bold w-full text-[15px] bg-[linear-gradient(-180deg,#2E4B5E_0%,#243A48_82%)] text-white px-3 py-2 rounded-t">
            Live Sports Profit
          </div>
          <div className="flex items-center justify-center h-[350px]">
            <div className="h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] rounded-full border border-gray-600"></div>
          </div>
        </div>

        {/* Backup Sports Profit */}
        <div className="flex flex-col w-full sm:w-[400px] md:w-[450px] border border-gray-400 rounded-t-2xl">
          <div className="font-bold w-full text-[15px] bg-[linear-gradient(-180deg,#2E4B5E_0%,#243A48_82%)] text-white px-3 py-2 rounded-t">
            Backup Sports Profit
          </div>
          <div className="flex items-center justify-center h-[350px]">
            <div className="h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] rounded-full border border-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
