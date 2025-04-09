import React from "react";

export const MatchTable = () => {
  return (
    <div className="w-full max-w-md border rounded shadow-lg">
      {/* Header */}
      <div className="bg-gray-800 text-white font-bold p-2">Profit/Loss</div>

      {/* Controls */}
      <div className="p-2">
        <div className="flex flex-col gap-2 justify-between items-center mb-2 rounded-lg">
          {/* Show Entries */}
          <div className="flex  items-center gap-x-1 ">
            <p className=" text-xs font-semibold"> Show</p>
            <select className="border rounded-sm p-1 text-sm w-16">
              <option>10</option>
            </select>
            <p className=" text-xs font-semibold"> entries</p>
          </div>
          {/* Search */}
          <div className="flex items-center gap-1">
            <label className="text-xs text-gray-600 font-semibold">
              Search:
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 text-sm w-[80%] "
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-300 text-left text-xs">
              <th className="p-2 border border-gray-400 ">Sport Name</th>
              <th className="p-2 border border-gray-400 ">Profit & Loss</th>
              <th className="p-2 border border-gray-400 ">Commission</th>
              <th className="p-2 border border-gray-400 ">Total P&L</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border  text-blue-500 underline border-gray-400  ">
                <p className=" cursor-pointer">Cricket </p>
              </td>
              <td className="p-2 border border-gray-400 ">13,900</td>
              <td className="p-2 border border-gray-400 ">0</td>
              <td className="p-2 border border-gray-400 ">13,900</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-2 text-xs flex justify-between gap-4 mt-4 flex-col items-center ">
        <div className=" w-full flex justify-start">
          <span>Showing 1 to 1 of 1 entries</span>
        </div>
        <div className="flex space-x-2">
          <button className=" px-2 py-1">First</button>
          <button className=" px-2 py-1">Previous</button>
          <span className="border px-3 py-1 bg-gray-300">1</span>
          <button className=" px-2 py-1">Next</button>
          <button className=" px-2 py-1">Last</button>
        </div>
      </div>
    </div>
  );
};

export default MatchTable;
