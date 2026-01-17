"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "../services/services";

import "react-datepicker/dist/react-datepicker.css";

// components
import BookingCalendar from "@/components/BookingCalendar";
import TimeSlots from "@/components/TimeSlots";
import DashboardHistorySlider from "@/components/DashboardHistorySlider";

export default function Dashboard() {
  const router = useRouter();
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [service, setService] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    document.title = "Dashboard";

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch history");
        }

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

  useEffect(() => {
    if (!date) return;

    const fetchBookedTimes = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings?date=${date.toLocaleDateString(
            "en-CA"
          )}`
        );

        const data = await res.json();
        setBookedTimes(data);
      } catch {
        setBookedTimes([]);
      }
    };

    fetchBookedTimes();
  }, [date]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    if (!service || !date || !time) {
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
        body: JSON.stringify({
          service,
          date: date.toLocaleDateString("en-CA"),
          time,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setTreatmentHistory((prev) => [data.booking, ...prev]);

      setService("");
      setDate(null);
      setTime("");

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  // לוחץ על Cancel ליד תור – פותח מודאל
  const handleDeleteBooking = (booking) => {
    setBookingToDelete(booking);
  };

  // המחיקה האמיתית מהשרת
  const confirmDeleteBooking = async () => {
    if (!bookingToDelete) return;
    console.log("Deleting booking:", bookingToDelete);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    console.log("Token:", token);

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingToDelete._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        console.error("Server error:", data.message);
        throw new Error(data.message || "Failed to delete booking");
      }

      console.log("Booking deleted successfully!");
      setTreatmentHistory((prev) =>
        prev.filter((b) => b._id !== bookingToDelete._id)
      );
      setBookingToDelete(null);
    } catch (err) {
      console.error("Failed to delete booking:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-primary flex flex-col text-white p-8 gap-8">
      {bookingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-red-500 animate-fade-in">
            <h3 className="text-xl font-bold text-red-400 mb-4 text-center">
              Cancel Booking?
            </h3>

            <div className="bg-gray-800 rounded-xl p-4 mb-6 space-y-2">
              <p className="text-sm text-gray-300">
                <span className="font-semibold">Service:</span>{" "}
                {bookingToDelete.service}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(bookingToDelete.date).toLocaleDateString("he-IL")}
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-semibold">Time:</span>{" "}
                {bookingToDelete.time}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setBookingToDelete(null)}
                className="flex-1 rounded-xl border border-gray-600 py-2 hover:bg-gray-800 transition"
              >
                Keep Booking
              </button>

              <button
                onClick={confirmDeleteBooking}
                className="flex-1 rounded-xl bg-red-500 text-black font-semibold py-2 hover:bg-red-400 transition"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 border border-accent rounded-2xl p-8 text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-accent mb-2">
              ✅ Booking Successful
            </h3>
            <p className="text-gray-300">
              Your appointment has been booked successfully.
            </p>
          </div>
        </div>
      )}

      {/* TOP – Treatment History */}
      <div className="bg-gray-900/80 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Treatment History</h2>

        {error && <p className="text-red-400">{error}</p>}

        {treatmentHistory.length === 0 ? (
          <p className="text-gray-400">No treatments found.</p>
        ) : (
          <DashboardHistorySlider
            treatmentHistory={treatmentHistory}
            onDelete={handleDeleteBooking}
          />
        )}
      </div>

      {/* BOTTOM – booking form */}
      <div className="flex-1 bg-gray-900/80 rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto">
        <h2 className="text-2xl font-bold">Book a Treatment</h2>

        <form className="flex flex-col gap-6" onSubmit={handleBooking}>
          {/* service selector */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {services.map((s) => {
              const isSelected = service === s.title;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setService(s.title);
                    setDate(null);
                    setTime("");
                  }}
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
                  <img src={s.icon} alt={s.title} className="w-8 h-8" />
                  <span className="font-semibold text-sm">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* calendar + time slots */}
          <div
            className={`flex flex-col lg:flex-row gap-10 ${
              !service ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="scale-110 origin-top-left">
              <BookingCalendar
                date={date}
                setDate={(d) => {
                  setDate(d);
                  setTime("");
                }}
                disabled={!service}
              />
            </div>

            {date && (
              <div className="w-full lg:max-w-[320px]">
                <TimeSlots
                  date={date}
                  selectedTime={time}
                  setSelectedTime={setTime}
                  bookedTimes={bookedTimes}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!service || !date || !time}
            className={`btn btn-accent w-full ${
              !service || !date || !time ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
