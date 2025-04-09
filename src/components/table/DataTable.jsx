import TableBody from "./TableBody";
import TableControls from "./TableControls";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";

// Reusable Table Component
const DataTable = ({ title, data, columns, entriesPerPage, setEntriesPerPage, searchQuery, setSearchQuery, sortField, sortDirection, onSort, currentPage, totalPages, goToPage , rowKey , userTypeCode , setIsNested ,isNested}) => {

 
  return (
    <div className="bg-white mt-4 border border-gray-300 rounded">
      {
        title &&  <div className="bg-gray-800 text-white p-3 font-bold text-lg">{title}</div>
      }
     
      <div className="p-4">
        <TableControls entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHeader columns={columns} sortField={sortField} sortDirection={sortDirection} onSort={onSort} />
            <TableBody data={data} columns={columns}  rowKey={rowKey} userTypeCode={userTypeCode} setIsNested={setIsNested}  isNested={isNested}/>
          </table>
        </div>
        <TablePagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
      </div>
    </div>
  );
};

export default DataTable;
