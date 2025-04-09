

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import DataTable from "../components/table/DataTable";
import { sortData, paginateData, filterData } from "../utils/table";
import { PLREPORTS_COL } from "../utils/columns";

const ProfitLossTable = ({ 
  title = "Profit Loss",
  initialDataSource = "LIVE DATA",
  dataSourceOptions = ['LIVE DATA', 'BACKUP DATA', 'OLD DATA']
}) => {
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [fromDate, setFromDate] = useState("19/03/2025");
  const [toDate, setToDate] = useState("19/03/2025");
  const [fromTime, setFromTime] = useState("00:00");
  const [toTime, setToTime] = useState("23:59");

  const [tableData, setTableData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { key: "sportName", label: "Sport Name", align: "left", sortable: true },
    { key: "uplineProfit", label: "Upline Profit/Loss", align: "center", sortable: true },
    { key: "downlineProfit", label: "Downline Profit/Loss", align: "center", sortable: true },
    { key: "commission", label: "Commission", align: "center", sortable: true },
  ];

  const dummyData = [
    { sportName: "Football", uplineProfit: 5240.50, downlineProfit: -230.75, commission: 125.00 },
    { sportName: "Cricket", uplineProfit: 1850.25, downlineProfit: 420.30, commission: 90.50 },
    { sportName: "Tennis", uplineProfit: -320.75, downlineProfit: 150.20, commission: 45.25 },
    { sportName: "Basketball", uplineProfit: 980.00, downlineProfit: -175.50, commission: 65.75 },
    { sportName: "Horse Racing", uplineProfit: 3200.25, downlineProfit: 780.40, commission: 180.25 },
    { sportName: "Boxing", uplineProfit: 450.75, downlineProfit: -90.25, commission: 30.00 },
  ];

  const handleGetPL = () => {
    setIsLoading(true);
    setTimeout(() => {
      setTableData(dataSource === "LIVE DATA" ? dummyData : []);
      setCurrentPage(1);
      setIsLoading(false);
    }, 600);
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  // **Apply Modular Table Functions**
  const filteredData = filterData(tableData, searchQuery);
  const sortedData = sortData(filteredData, sortField, sortDirection);
  const { paginatedData, totalPages } = paginateData(sortedData, currentPage, entriesPerPage);

  return (
    <div className="w-full max-w-6xl mx-auto border border-gray-300 rounded bg-gray-50 p-4">
      {/* Data Source & Date Filters */}
      <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-100 border border-gray-300 rounded mb-6">
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
          <select
            value={dataSource}
            onChange={(e) => setDataSource(e.target.value)}
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
                onChange={(e) => setFromDate(e.target.value)}
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
            onChange={(e) => setFromTime(e.target.value)}
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
                onChange={(e) => setToDate(e.target.value)}
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
            onChange={(e) => setToTime(e.target.value)}
            className="border border-gray-300 rounded p-2 w-16 mt-6"
          />
        </div>

        <button
          onClick={handleGetPL}
          disabled={isLoading}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-6 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Get P&L"}
        </button>
      </div>

      {/* Profit Loss Table */}
      <DataTable
        columns={PLREPORTS_COL}
        data={paginatedData}
        entriesPerPage={entriesPerPage}
        currentPage={currentPage}
        searchQuery={searchQuery}
        sortField={sortField}
        sortDirection={sortDirection}
        totalPages={totalPages}
        onSort={handleSort}
        setSearchQuery={setSearchQuery}
        setEntriesPerPage={setEntriesPerPage}
        goToPage={setCurrentPage}
      />
    </div>
  );
};

export default ProfitLossTable;
