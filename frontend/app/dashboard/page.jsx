"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "../services/services";

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
        if (!token) return router.push("/login");

        const res = await fetch("http://localhost:5000/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch data");

        setUser(data.user);
        setTreatmentHistory(data.user.treatmentHistory || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
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
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:border-accent"
          >
            <option value="" disabled hidden>
              Select a Service
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:border-accent"
          />
          <button type="submit" className="btn btn-accent w-full mt-2">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
