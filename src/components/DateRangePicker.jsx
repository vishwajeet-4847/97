import React from "react";
import { formatDate } from "../utils/formatters";

const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  loading,
  onButtonClick,
  buttonTitle,
  isDataSource,
  dataSource,
  setDataSource,
  dataSourceOptions = [],
  disableDateInputs = false, // ⬅️ NEW: controls input disable state
}) => {
  const handleDataSourceChange = (source) => {
    setDataSource(source);

    let end = new Date();
    let start = new Date();

    switch (source) {
      case "LIVE DATA":
        start.setDate(end.getDate() - 1);
        break;
      case "BACKUP DATA":
        start.setDate(end.getDate() - 90);
        break;
      case "OLD DATA":
        start.setFullYear(end.getFullYear() - 1);
        break;
      default:
        setDataSource(false);
        return; // Don't auto-set dates for custom dataSource
    }

    const startDateD = formatDate(start);
    const endDateD = formatDate(end);
    setStartDate(startDateD);
    setEndDate(endDateD);
  };

  const isInputDisabled =
    disableDateInputs || ["LIVE DATA", "BACKUP DATA", "OLD DATA"].includes(dataSource);

  return (
    <div className="bg-white p-6 rounded mb-4">
      <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-100 border border-gray-300 rounded mb-6">
        {isDataSource && (
          <div className="mr-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
            <select
              value={dataSource}
              onChange={(e) => handleDataSourceChange(e.target.value)}
              className="border border-gray-300 rounded p-2 w-48 bg-white"
            >
              {dataSourceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isInputDisabled}
            className={`w-full p-2 border border-gray-300 rounded bg-white ${
              isInputDisabled ? "cursor-not-allowed bg-gray-100" : ""
            }`}
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isInputDisabled}
            className={`w-full p-2 border border-gray-300 rounded bg-white ${
              isInputDisabled ? "cursor-not-allowed bg-gray-100" : ""
            }`}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            className={`w-full md:w-auto px-4 py-2 text-white rounded ${
              loading ? "bg-gray-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={onButtonClick}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              buttonTitle
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
