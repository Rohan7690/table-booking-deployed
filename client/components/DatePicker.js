import React from "react";

const DatePicker = ({ onDateChange }) => {
  const handleDateChange = (e) => {
    onDateChange(e.target.value); // Pass the selected date string (YYYY-MM-DD)
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Date</h3>
      <input
        type="date"
        onChange={handleDateChange}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default DatePicker;
