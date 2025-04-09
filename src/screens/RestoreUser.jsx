import React, { useState, useEffect } from "react";
import DataTable from "../components/table/DataTable";
import { sortData, paginateData, filterData } from "../utils/table";
import { RESTORE_USER_COL } from "../utils/columns";



const RestoreUserTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Fetch data (Replace with API call later)
  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        { id: 1, username: "john_doe", name: "John Doe", date: "2025-03-10 14:22:15",action:'Restore' },
        { id: 2, username: "jane_smith", name: "Jane Smith", date: "2025-03-08 09:45:30",action:'Restore' },
        { id: 3, username: "robert_johnson", name: "Robert Johnson", date: "2025-03-05 16:33:42",action:'Restore' },
        { id: 4, username: "emily_davis", name: "Emily Davis", date: "2025-03-02 11:20:18",action:'Restore' },
        { id: 5, username: "michael_brown", name: "Michael Brown", date: "2025-02-28 13:15:55",action:'Restore' },
      ];
      setData(dummyData);
    };

    fetchData();
  }, []);

  // Apply filter, sort, and paginate
  const filteredData = filterData(data, searchQuery);
  const sortedData = sortData(filteredData, sortField, sortDirection);
  const { paginatedData, totalPages } = paginateData(sortedData, currentPage, entriesPerPage);

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <DataTable
          title="Restore User"
          columns={RESTORE_USER_COL}
          data={paginatedData}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSortDirection={setSortDirection}
          currentPage={currentPage}
          totalPages={totalPages} 
          goToPage={setCurrentPage}
        
        />
      </div>
    </div>
  );
};

export default RestoreUserTable;
