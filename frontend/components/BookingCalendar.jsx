"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingCalendar({ date, setDate, disabled }) {
  // פונקציה לחסימת ימי שישי ושבת
  const isWeekday = (d) => {
    const day = d.getDay();
    return day !== 5 && day !== 6; // 0 = ראשון, 5 = שישי, 6 = שבת
  };

  return (
    <div className={`${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <DatePicker
        selected={date ? new Date(date) : null}
        onChange={(d) => setDate(d.toISOString().split("T")[0])}
        inline
        minDate={new Date()}
        filterDate={isWeekday}
        calendarClassName="
          bg-gray-900 text-white rounded-2xl border border-gray-700 p-4 shadow-xl
          [&_.react-datepicker__header]:bg-gray-800
          [&_.react-datepicker__current-month]:text-lg font-semibold
          [&_.react-datepicker__day-name]:text-gray-400
          [&_.react-datepicker__day]:text-gray-300
          [&_.react-datepicker__day--disabled]:text-gray-600 cursor-not-allowed
          [&_.react-datepicker__day:hover]:bg-accent/50
          [&_.react-datepicker__day--selected]:bg-accent text-black
        "
      />
    </div>
  );
}
