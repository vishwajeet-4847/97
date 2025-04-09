
import React, { useState, useEffect } from "react";
import DataTable from "../components/table/DataTable";
import { sortData, paginateData, filterData } from "../utils/table";
import { PASSWORD_HISTORY_COL } from "../utils/columns";

const columns = [
  { key: "username", label: "Username", sortable: true },
  { key: "remarks", label: "Remarks" },
  { key: "date", label: "Date & Time", sortable: true },
];

const PasswordChangeHistory = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Fetch data (Replace with API call later)
  useEffect(() => {
    const fetchData = async () => {
      // Simulating API fetch with dummy data
      const dummyData = [
        { id: 1, username: "admin", remarks: "Password changed by admin", date: "2025-03-15 09:34:21" },
        { id: 2, username: "john_doe", remarks: "Password reset via email", date: "2025-03-14 15:22:10" },
        { id: 3, username: "jane_smith", remarks: "Forced password change - 90 day policy", date: "2025-03-12 11:45:33" },
        { id: 4, username: "robert_johnson", remarks: "New user setup", date: "2025-03-10 08:30:15" },
        { id: 5, username: "sarah_williams", remarks: "Password expired", date: "2025-03-08 14:20:45" },
        { id: 6, username: "michael_brown", remarks: "Account recovery", date: "2025-03-07 10:15:22" },
        { id: 7, username: "emily_davis", remarks: "Self-service password reset", date: "2025-03-05 16:42:11" },
        { id: 8, username: "david_miller", remarks: "Password changed by admin", date: "2025-03-04 09:10:30" },
        { id: 9, username: "lisa_wilson", remarks: "Security audit update", date: "2025-03-02 13:25:48" },
        { id: 10, username: "james_taylor", remarks: "First time login", date: "2025-03-01 11:18:37" },
      ];

      setData(dummyData);
    };

    fetchData();
  }, []);

  // Apply filter, sort, and paginate
  const filteredData = filterData(data, searchQuery);
  const sortedData = sortData(filteredData, sortField, sortDirection);
  const paginatedData = paginateData(sortedData, currentPage, entriesPerPage);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <DataTable
          title="Password History"
          data={paginatedData}
          columns={PASSWORD_HISTORY_COL}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={(key) => {
            setSortField(key);
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          }}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / entriesPerPage)}
          goToPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PasswordChangeHistory;
