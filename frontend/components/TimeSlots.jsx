// components/TimeSlots.jsx
"use client";

import { useEffect, useState } from "react";

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);

export default function TimeSlots({
  date,
  selectedTime,
  setSelectedTime,
  bookedTimes = [],
}) {
  if (!date) return null;

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const selectedDate = new Date(date);

  const isToday =
    selectedDate.getFullYear() === now.getFullYear() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getDate() === now.getDate();

  const currentHour = now.getHours();

  return (
    <div className="grid grid-cols-4 gap-3">
      {HOURS.map((hour) => {
        const label = `${hour}:00`;
        const isSelected = selectedTime === label;

        const isPastHour = isToday && hour <= currentHour;

        const isBooked = bookedTimes.includes(label);

        const isDisabled = isPastHour || isBooked;

        return (
          <button
            key={label}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && setSelectedTime(label)}
            className={`
              p-3 rounded-lg border transition
              ${
                isDisabled
                  ? "bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed"
                  : isSelected
                  ? "bg-accent text-black border-accent"
                  : "bg-gray-800 border-gray-600 hover:border-accent/60"
              }
            `}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
