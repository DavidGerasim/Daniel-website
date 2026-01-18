// components/BookingCalendar.jsx
"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingCalendar({
  date,
  setDate,
  disabled,
  fullyBookedDates = [],
}) {
  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isAvailableDate = (d) => {
    const day = d.getDay();
    if (day === 5 || day === 6) return false;

    const iso = formatDate(d);
    return !fullyBookedDates.includes(iso);
  };

  return (
    <div className="calendar-dark">
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        filterDate={isAvailableDate}
        minDate={new Date()}
        inline
        disabled={disabled}
      />
    </div>
  );
}
