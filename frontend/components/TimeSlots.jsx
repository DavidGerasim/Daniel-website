"use client";

const HOURS = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`);

export default function TimeSlots({ date, selectedTime, setSelectedTime }) {
  if (!date) return null;

  return (
    <div className="grid grid-cols-4 gap-3">
      {HOURS.map((hour) => {
        const isSelected = selectedTime === hour;

        return (
          <button
            key={hour}
            type="button"
            onClick={() => setSelectedTime(hour)}
            className={`
              p-3 rounded-lg border transition
              ${
                isSelected
                  ? "bg-accent text-black border-accent"
                  : "bg-gray-800 border-gray-600 hover:border-accent/60"
              }
            `}
          >
            {hour}
          </button>
        );
      })}
    </div>
  );
}
