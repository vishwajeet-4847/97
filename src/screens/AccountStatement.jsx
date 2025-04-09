
import React, { useState, useEffect, useContext } from 'react';
import DateRangePicker from '../components/DateRangePicker';
import DataTable from '../components/table/DataTable';
import { sortData, filterData, paginateData } from '../utils/table';
import { AccountContext } from '../services/account/account.context';
import { AuthContext } from '../services/auth/auth.context';

import { ACCOUNT_STATEMENT_COLS } from '../utils/columns';

const AccountStatement = () => {
    const [fromDate, setFromDate] = useState('2025-04-01');
  const [toDate, setToDate] = useState('2025-04-02');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('dateTime');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [accountStatementData, setAccountStatementData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const { onGetAccountsStatementData } = useContext(AccountContext);
    const { user } = useContext(AuthContext);


    // for fetching acoounts data
    const fetchAccountStatement = async () => {
        if (!user?.user_id) return;
    
        try {
          const data = await onGetAccountsStatementData({
            userId: user.user_id,
            fromDate,
            toDate,
          });
    
          if (Array.isArray(data)) {
            setAccountStatementData(data);
            setFilteredData(data);
            setCurrentPage(1);
          }
        } catch (error) {
          console.error("Error fetching account statement:", error);
        }
      };
      useEffect(() => {
        fetchAccountStatement(); // fetch on mount
      }, []);
    
      useEffect(() => {
        const searchedData = filterData(filteredData, searchQuery, ACCOUNT_STATEMENT_COLS.map(col => col.key));
        const sortedData = sortData(searchedData, sortField, sortDirection);
        const { paginatedData: newPaginatedData, totalPages: computedTotalPages } = paginateData(sortedData, currentPage, entriesPerPage);
        setPaginatedData(newPaginatedData);
        setTotalPages(computedTotalPages);
      }, [filteredData, searchQuery, sortField, sortDirection, currentPage, entriesPerPage]);
    
      const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
      };

    return (
        <div className=" w-full">
            <div className="p-2 bg-white rounded-sm">
                <DateRangePicker
                    startDate={fromDate} 
                    endDate={toDate} 
                    setStartDate={setFromDate} 
                    setEndDate={setToDate} 
                    buttonTitle={"Get Statements"}
                    onButtonClick={fetchAccountStatement}
                />
            </div>
            <div>
                <DataTable
                    title="Accounts Summary"
                    data={paginatedData}
                    columns={ACCOUNT_STATEMENT_COLS}
                    entriesPerPage={entriesPerPage} 
                    setEntriesPerPage={setEntriesPerPage} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    sortField={sortField} 
                    sortDirection={sortDirection} 
                    onSort={(field) => {
                        setSortField(field);
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                    }}
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    goToPage={goToPage}
                />
            </div>
        </div>
    );
};

export default AccountStatement;