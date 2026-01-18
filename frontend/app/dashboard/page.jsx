"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "../services/services";

import "react-datepicker/dist/react-datepicker.css";

// components
import BookingCalendar from "@/components/BookingCalendar";
import TimeSlots from "@/components/TimeSlots";
import DashboardHistorySlider from "@/components/DashboardHistorySlider";

// modals
import DeleteBookingModal from "@/components/modals/DeleteBookingModal";
import BookingSuccessModal from "@/components/modals/BookingSuccessModal";

import {
  fetchMyBookings,
  fetchBookedTimes,
  createBooking,
  deleteBookingById,
} from "@/services/bookings.api";

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
        const data = await fetchMyBookings();
        setTreatmentHistory(data);
      } catch (err) {
        console.error(err);
        setError(err.message);

        if (err.message === "Unauthorized") {
          router.replace("/login");
        }
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    if (!date) return;

    const loadBookedTimes = async () => {
      try {
        const data = await fetchBookedTimes(date.toLocaleDateString("en-CA"));
        setBookedTimes(data);
      } catch {
        setBookedTimes([]);
      }
    };

    loadBookedTimes();
  }, [date]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    if (!service || !date || !time) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const booking = await createBooking({
        service,
        date: date.toLocaleDateString("en-CA"),
        time,
      });

      setTreatmentHistory((prev) => [booking, ...prev]);

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

  const handleDeleteBooking = (booking) => {
    setBookingToDelete(booking);
  };

  const confirmDeleteBooking = async () => {
    if (!bookingToDelete) return;

    try {
      await deleteBookingById(bookingToDelete._id);

      setTreatmentHistory((prev) =>
        prev.filter((b) => b._id !== bookingToDelete._id)
      );

      setBookingToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-primary flex flex-col text-white p-8 gap-8">
      <DeleteBookingModal
        booking={bookingToDelete}
        onCancel={() => setBookingToDelete(null)}
        onConfirm={confirmDeleteBooking}
      />

      <BookingSuccessModal show={showSuccess} />

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
