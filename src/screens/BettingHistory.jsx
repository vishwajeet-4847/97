

import React, { useState, useEffect } from 'react';
import DataTable from '../components/table/DataTable';
import { sortData, paginateData, filterData } from "../utils/table";
import { BETTING_HISTORY_COL } from '../utils/columns';

const BettingHistoryTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [betType, setBetType] = useState('UnSettle');
  const [sport, setSport] = useState('Cricket');
  const [fromDate, setFromDate] = useState('2025-03-18');
  const [toDate, setToDate] = useState('2025-03-18');


  // Effect for filtering and sorting
  useEffect(() => {
    let filtered = filterData(data, searchTerm);
    filtered = sortData(filtered, sortField, sortDirection);
    setFilteredData(filtered);
  }, [data, searchTerm, sortField, sortDirection]);

  const handleSort = (key) => {
    setSortDirection(prev => (sortField === key && prev === 'asc' ? 'desc' : 'asc'));
    setSortField(key);
  };

  const handleGetHistory = () => {
    const sampleData = Array(15).fill().map((_, index) => ({
      userName: `User${index + 1}`,
      sportName: ['Cricket', 'Football', 'Tennis'][Math.floor(Math.random() * 3)],
      event: `Match ${index + 1}`,
      market: ['Win', 'Draw', 'Over/Under'][Math.floor(Math.random() * 3)],
      selection: ['Team A', 'Team B', 'Draw'][Math.floor(Math.random() * 3)],
      type: ['Back', 'Lay'][Math.floor(Math.random() * 2)],
      oddsReq: (Math.random() * 5 + 1).toFixed(2),
      stack: Math.floor(Math.random() * 1000) + 100,
      placeTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`,
      settleTime: Math.random() > 0.3 ? `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}` : '-'
    }));

    setData(sampleData);
    setFilteredData(sampleData);
  };

  return (
    <div className="bg-gray-100 p-4 font-sans">
      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Bet Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Choose Type</label>
            <select 
              value={betType}
              onChange={e => setBetType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="UnSettle">UnSettle</option>
              <option value="Settle">Settle</option>
              <option value="All">Void</option>
            </select>
          </div>

          {/* Sport Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Choose Sport</label>
            <select 
              value={sport}
              onChange={e => setSport(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Tennis">Tennis</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <input 
              type="date" 
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <input 
              type="date" 
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Get History Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleGetHistory}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Get History
          </button>
        </div>
      </div>

      {/* DataTable Component */}
      <DataTable
        columns={BETTING_HISTORY_COL}
        data={paginateData(filteredData, currentPage, entriesPerPage)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        entriesPerPage={entriesPerPage}
        setEntriesPerPage={setEntriesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(filteredData.length / entriesPerPage)}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
};

export default BettingHistoryTable;

