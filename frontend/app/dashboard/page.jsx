"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "../services/services";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// components
import BookingCalendar from "@/components/BookingCalendar";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Dashboard";

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch history");
        }

        // 🔥 data הוא מערך, לא user
        setTreatmentHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message);

        if (err.message === "Invalid token" || err.message === "Unauthorized") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.replace("/login");
        }
      }
    };

    fetchUserData();
  }, [router]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    if (!service || !date) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ service, date }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      setTreatmentHistory([...treatmentHistory, data.booking]);
      setService("");
      setDate("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex text-white p-8 gap-8">
      {/* צד שמאל – היסטוריה */}
      <div className="flex-1 bg-gray-900/80 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Treatment History</h2>
        {error && <p className="text-red-400">{error}</p>}
        {treatmentHistory.length === 0 ? (
          <p>No treatments found.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {treatmentHistory
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((treatment, idx) => (
                <li
                  key={idx}
                  className="bg-gray-800 p-3 rounded-lg flex justify-between"
                >
                  <span>{treatment.service}</span>
                  <span>{new Date(treatment.date).toLocaleDateString()}</span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* צד ימין – טופס הזמנה */}
      <div className="flex-1 bg-gray-900/80 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Book a Treatment</h2>
        <form className="flex flex-col gap-4" onSubmit={handleBooking}>
          <div className="grid grid-cols-2 gap-4">
            {services.map((s) => {
              const isSelected = service === s.title;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setService(s.title)}
                  className={`
    relative z-10
    w-full
    h-18
    p-3
    rounded-xl
    border
    transition
    flex flex-col items-center justify-center text-center gap-2
    ${
      isSelected
        ? "bg-accent text-black border-accent"
        : "bg-gray-800 border-gray-600 hover:border-accent/60"
    }
  `}
                >
                  <img
                    src={s.icon}
                    alt={s.title}
                    className="w-8 h-8 pointer-events-none"
                  />
                  <span className="font-semibold text-sm leading-tight">
                    {s.title}
                  </span>{" "}
                </button>
              );
            })}
          </div>

          <div
            className={`${!service ? "opacity-50 pointer-events-none" : ""}`}
          >
            <BookingCalendar
              date={date}
              setDate={setDate}
              disabled={!service}
            />
          </div>

          <button type="submit" className="btn btn-accent w-full mt-2">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
