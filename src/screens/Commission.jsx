import React, { useState, useEffect } from 'react';
import DateRangePicker from '../components/DateRangePicker';
import TabSwitcher from '../components/TabSwitcher';
import DataTable from '../components/table/DataTable';
import { sortData, paginateData, filterData } from "../utils/table";
import { COMMISSION_COL } from '../utils/columns';

const CommissionTable = () => {
  const [activeTab, setActiveTab] = useState('Fancy');
  const [startDate, setStartDate] = useState('2025-03-18');
  const [endDate, setEndDate] = useState('2025-03-18');
  const [loadedData, setLoadedData] = useState({});
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const baseTabData = {
    Fancy: [
      { agent: 'John Doe', turnover: 25000, commission: 1250, date: '2025-03-15' },
      { agent: 'Alice Smith', turnover: 32000, commission: 1600, date: '2025-03-16' },
    ],
    Matka: [
      { agent: 'Sarah Wilson', turnover: 15600, commission: 780, date: '2025-03-16' },
    ],
    Casino: [
      { agent: 'Robert Johnson', turnover: 45000, commission: 2250, date: '2025-03-15' },
      { agent: 'Emily Davis', turnover: 32000, commission: 1600, date: '2025-03-16' },
      { agent: 'Michael Brown', turnover: 25000, commission: 1250, date: '2025-03-17' },
    ],
    Binary:[
      { agent: 'John Doe', turnover: 25000, commission: 1250, date: '2025-03-15' },
      { agent: 'Alice Smith', turnover: 32000, commission: 1600, date: '2025-03-16' },
    ],
    SportBook:[
      { agent: 'Sarah Wilson', turnover: 15600, commission: 780, date: '2025-03-16' },
      {
        agent: 'Robert Johnson', turnover: 45000, commission: 2250, date: '2025-03-15' },
      
    ],
    Bookmaker:[
      { agent: 'Emily Davis', turnover: 32000, commission: 1600, date: '2025-03-16' },
      { agent: 'Michael Brown', turnover: 25000, commission: 1250, date: '2025-03-17' },
    ]

  };

  useEffect(() => {
    setLoadedData(baseTabData);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const fetchCommissionData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoadedData(baseTabData);
      setLoading(false);
    }, 800);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc');
  };

  let filteredData = filterData(loadedData[activeTab] || [], searchQuery);

  
  let sortedData = sortData(filteredData, sortField, sortDirection);
 
  let { paginatedData, totalPages } = paginateData(sortedData,  currentPage,entriesPerPage);
  



  return (
    <div className="w-full p-4">
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        loading={loading}
        buttonTitle="Get Commission"
        onButtonClick={fetchCommissionData}
      />
      <div className='p-4'>
        <TabSwitcher tabs={Object.keys(baseTabData)} activeTab={activeTab} onTabChange={setActiveTab} />
        <DataTable
          title="Agent Commission"
          columns={COMMISSION_COL}
          data={paginatedData}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CommissionTable;

