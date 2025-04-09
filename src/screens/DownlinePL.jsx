import React, { useState } from "react";
import { Calendar } from "lucide-react";
import DataTable from "../components/table/DataTable";
import { sortData, paginateData, filterData } from "../utils/table";
import { DOWNLINE_PROFIT_COL } from "../utils/columns";

const ProfitLossTableDownline = ({ 

  initialDataSource = "LIVE DATA",
  dataSourceOptions = ["LIVE DATA", "BACKUP DATA", "OLD DATA"]
}) => {
  const initialFormState = {
    dataSource: initialDataSource,
    fromDate: "19/03/2025",
    toDate: "19/03/2025",
    fromTime: "00:00",
    toTime: "23:59",
  };




  const [formState, setFormState] = useState(initialFormState);
  const [tableData, setTableData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);

  const { dataSource, fromDate, toDate, fromTime, toTime } = formState;


  const dummyData = [
    { sportName: "Cricket", uplineProfit: 5240.5, downlineProfit: -230.75, commission: 125.0 },
    { sportName: "Football", uplineProfit: 1850.25, downlineProfit: 420.3, commission: 90.5 },
    { sportName: "Tennis", uplineProfit: -320.75, downlineProfit: 150.2, commission: 45.25 },
    { sportName: "Basketball", uplineProfit: 980.0, downlineProfit: -175.5, commission: 65.75 },
  ];

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetPL = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (dataSource === "LIVE DATA") {
        setTableData(dummyData);
      } else if (dataSource === "BACKUP DATA") {
        setTableData(dummyData.slice(0, 2));
      } else {
        setTableData([]);
      }
      setCurrentPage(1);
      setIsLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setFormState(initialFormState);
    setTableData([]);
    setSearchQuery("");
    setCurrentPage(1);
    setSortField("");
    setSortDirection("asc");
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  const filteredData = filterData(tableData, searchQuery);
  const sortedData = sortData(filteredData, sortField, sortDirection);
  const { paginatedData, totalPages } = paginateData(sortedData, currentPage, entriesPerPage);

  return (
    <div className="w-full max-w-6xl mx-auto border border-gray-300 rounded bg-gray-50 p-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-100 border border-gray-300 rounded mb-6">
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
          <select
            value={dataSource}
            onChange={(e) => handleInputChange("dataSource", e.target.value)}
            className="border border-gray-300 rounded p-2 w-48 bg-white"
          >
            {dataSourceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="flex items-center">
              <input
                type="text"
                value={fromDate}
                onChange={(e) => handleInputChange("fromDate", e.target.value)}
                className="border border-gray-300 rounded p-2 w-28"
              />
              <button className="bg-gray-200 p-2 border border-gray-300 ml-1">
                <Calendar size={16} />
              </button>
            </div>
          </div>
          <input
            type="text"
            value={fromTime}
            onChange={(e) => handleInputChange("fromTime", e.target.value)}
            className="border border-gray-300 rounded p-2 w-16 mt-6"
          />
        </div>

        <div className="flex items-center gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="flex items-center">
              <input
                type="text"
                value={toDate}
                onChange={(e) => handleInputChange("toDate", e.target.value)}
                className="border border-gray-300 rounded p-2 w-28"
              />
              <button className="bg-gray-200 p-2 border border-gray-300 ml-1">
                <Calendar size={16} />
              </button>
            </div>
          </div>
          <input
            type="text"
            value={toTime}
            onChange={(e) => handleInputChange("toTime", e.target.value)}
            className="border border-gray-300 rounded p-2 w-16 mt-6"
          />
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={handleGetPL}
            disabled={isLoading}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Get P&L"}
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={DOWNLINE_PROFIT_COL}
        data={paginatedData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        entriesPerPage={entriesPerPage}
        setEntriesPerPage={setEntriesPerPage}
        currentPage={currentPage}
        goToPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ProfitLossTableDownline;
