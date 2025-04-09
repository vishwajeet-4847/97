import React, { useState } from "react";
import { Calendar as LucideCalendar } from "lucide-react";

// Custom Calendar Component
export const CalendarCompo = () => {
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [isFromCalendarOpen, setIsFromCalendarOpen] = useState(false);
  const [isToCalendarOpen, setIsToCalendarOpen] = useState(false);

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB");
  };

  // Generate calendar days
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Days to fill before first day of month
    const startingDay = firstDay.getDay();

    const days = [];

    // Previous month's days
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Handle date selection
  const handleDateSelect = (date, isFromCalendar) => {
    if (isFromCalendar) {
      setSelectedFromDate(date);
      setIsFromCalendarOpen(false);
    } else {
      setSelectedToDate(date);
      setIsToCalendarOpen(false);
    }
  };

  // Render calendar grid
  const renderCalendar = (date, isFromCalendar) => {
    const days = generateCalendarDays(date);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="bg-white border rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="text-gray-600">{"<"}</button>
          <span className="font-bold">
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button className="text-gray-600">{">"}</button>
        </div>
        <div className="grid grid-cols-7 text-center">
          {weekdays.map((day) => (
            <div key={day} className="font-bold text-xs text-gray-500">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              className={`
                p-2 
                ${!day ? "text-gray-300" : "hover:bg-gray-100 cursor-pointer"}
                ${
                  day &&
                  day.toDateString() ===
                    (isFromCalendar
                      ? selectedFromDate
                      : selectedToDate
                    ).toDateString()
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }
              `}
              onClick={() => day && handleDateSelect(day, isFromCalendar)}
              disabled={!day}
            >
              {day ? day.getDate() : ""}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 flex w-full flex-col gap-2 bg-gray-50 border rounded">
      <div className="flex flex-col gap-1">
        <p className="text-md font-bold text-gray-500">Data Source</p>
        <select className="bg-white p-2 text-xs font-bold text-black/60">
          <option value="">LIVE DATA</option>
        </select>
      </div>

      {/* From Date Picker */}
      <div className="flex flex-col gap-1 relative">
        <p className="text-xs font-semibold text-gray-500">From</p>
        <div
          className="flex items-center justify-between border rounded p-2 cursor-pointer"
          onClick={() => {
            setIsFromCalendarOpen(!isFromCalendarOpen);
            setIsToCalendarOpen(false);
          }}
        >
          <span className="text-sm">{formatDate(selectedFromDate)}</span>
          <LucideCalendar size={16} className="text-gray-400" />
        </div>

        {isFromCalendarOpen && (
          <div className="absolute top-full left-0 mt-1 z-10">
            {renderCalendar(selectedFromDate, true)}
          </div>
        )}
      </div>

      {/* To Date Picker */}
      <div className="flex flex-col gap-1 relative">
        <p className="text-xs font-semibold text-gray-500">To</p>
        <div
          className="flex items-center justify-between border rounded p-2 cursor-pointer"
          onClick={() => {
            setIsToCalendarOpen(!isToCalendarOpen);
            setIsFromCalendarOpen(false);
          }}
        >
          <span className="text-sm">{formatDate(selectedToDate)}</span>
          <LucideCalendar size={16} className="text-gray-400" />
        </div>

        {isToCalendarOpen && (
          <div className="absolute top-full left-0 mt-1 z-10">
            {renderCalendar(selectedToDate, false)}
          </div>
        )}
      </div>

      <div className="mt-2">
        <button className="bg-gray-800 font-bold text-white px-4 py-2 rounded text-sm">
          Get P&L
        </button>
      </div>
    </div>
  );
};
