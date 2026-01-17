"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingCalendar({ date, setDate, disabled }) {
  const isWeekday = (d) => {
    const day = d.getDay();
    return day !== 5 && day !== 6;
  };

  return (
    <div className="calendar-dark">
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        filterDate={isWeekday}
        minDate={new Date()}
        inline
        disabled={disabled}
      />
    </div>
  );
}
