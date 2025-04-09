// Table Pagination Component
const TablePagination = ({ currentPage, totalPages, goToPage }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mt-4">
      <div className="text-sm text-gray-600 mb-2 sm:mb-0">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex space-x-1">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50">First</button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50">Previous</button>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50">Next</button>
        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50">Last</button>
      </div>
    </div>
  );
};

export default TablePagination;