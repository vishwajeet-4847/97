

import React, { useState } from 'react';
import DataTable from '../components/table/DataTable';
import { sortData, paginateData, filterData } from "../utils/table";
import { BANKING_COL } from '../utils/columns';

const FinancialTable = ({ initialData = [] }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [sortField, setSortField] = useState('UID');
  const [sortDirection, setSortDirection] = useState('asc');

 
  // Sorting Logic
  const sortedData = sortData(initialData, sortField, sortDirection);

  // Filtering Logic
  const filteredData = filterData(sortedData, searchTerm);

  // Pagination Logic
  const paginatedData = paginateData(filteredData, currentPage, entriesPerPage);

  // Sorting Handler
  const handleSort = (field) => {
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  return (
    <div className="bg-white p-5 rounded shadow-sm">
      {/* Data Table Component */}
      <DataTable 
        columns={BANKING_COL} 
        data={paginatedData} 
        entriesPerPage={entriesPerPage} 
        setEntriesPerPage={setEntriesPerPage}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortField={sortField} 
        onSort={handleSort}
        sortDirection={sortDirection} 
        totalEntries={filteredData.length}
      />
      
      {/* Clear & Submit Section */}
      <div className="flex items-center gap-2 mx-3 my-3">
        {/* Clear Button */}
        <button 
          className="w-24 cursor-pointer bg-red-500 text-white border-red-500 font-bold px-2 py-1 text-xs rounded"
          onClick={() => {
            setSearchTerm('');
            setPassword('');
            setCurrentPage(0);
          }}
        >
          Clear All
        </button>
        
        {/* Password Input */}
        <input 
          type="password" 
          className="w-32 px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300 rounded focus:outline-none"
          placeholder="Password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Submit Button */}
        <button 
          className="w-28 cursor-pointer bg-gray-600 hover:bg-gray-800 text-white font-bold px-2 py-1 text-xs rounded"
          onClick={() => {
            if (password) {
              alert(`Payment submitted with password: ${password}`);
              setPassword('');
            } else {
              alert('Please enter password');
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FinancialTable;
