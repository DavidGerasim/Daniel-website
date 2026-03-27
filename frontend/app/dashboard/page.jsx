// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

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
  fetchFullyBookedDates,
} from "@/services/bookings.api";

import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const { lang } = useI18n();
  const t = dictionaries[lang];
  const services = t.services.list;

  const router = useRouter();
  const [treatmentHistory, setTreatmentHistory] = useState([]);
  const [service, setService] = useState("");
  const [date, setDate] = useState(null);
  const [error, setError] = useState("");
  const [time, setTime] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      const svc = services.find((s) => s.id === serviceFromUrl);
      if (svc) setService(svc.title);
    }
  }, [searchParams, services]);

  useEffect(() => {
    document.title = t.dashboard.title;

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
  //---------------------------------------------------------------

  useEffect(() => {
    fetchFullyBookedDates().then(setFullyBookedDates);
  }, []);
  //---------------------------------------------------------------
  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const booking = await createBooking({
        serviceId: service,
        date: date.toLocaleDateString("en-CA"),
        time,
      });

      setTreatmentHistory((prev) => [booking, ...prev]);

      const updatedFullyBookedDates = await fetchFullyBookedDates();
      setFullyBookedDates(updatedFullyBookedDates);

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
        prev.filter((b) => b._id !== bookingToDelete._id),
      );

      setBookingToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-primary flex flex-col text-white px-2 sm:px-4 md:px-8 lg:px-16 py-4 md:py-8 gap-6 sm:gap-8">
      <DeleteBookingModal
        booking={bookingToDelete}
        onCancel={() => setBookingToDelete(null)}
        onConfirm={confirmDeleteBooking}
      />

      <BookingSuccessModal show={showSuccess} />

      {/* TOP – Treatment History */}
      <div className="bg-gray-900/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 w-full max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t.dashboard.history.title}</h2>
        {error && <p className="text-red-400">{error}</p>}

        {treatmentHistory.length === 0 ? (
          <p className="text-gray-400">{t.dashboard.history.empty}</p>
        ) : (
          <DashboardHistorySlider
            treatmentHistory={treatmentHistory}
            onDelete={handleDeleteBooking}
          />
        )}
      </div>

      {/* BOTTOM – booking form */}
      <div className="flex-1 max-w-5xl mx-auto w-full bg-gray-900/80 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 pb-16 md:pb-24 flex flex-col gap-4 sm:gap-6 overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold">{t.dashboard.booking.title}</h2>
        <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleBooking}>
          {/* service selector */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600">
            {services.map((s) => {
              const isSelected = service === s.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setService(s.id);
                    setDate(null);
                    setTime("");
                  }}
                  className={`
                  relative z-10
                  min-w-[60px] min-h-[70px] sm:min-w-[90px] sm:min-h-[80px]
                  w-full max-w-[120px] sm:max-w-[160px]
                  px-1 sm:px-3 py-2 sm:py-3
                  rounded-lg sm:rounded-xl
                  border
                  transition
                  flex flex-col items-center justify-center text-center gap-1 sm:gap-2
                  ${isSelected
                    ? "bg-accent text-black border-accent"
                    : "bg-gray-800 border-gray-600 hover:border-accent/60"
                  }
                `}
                >
                  <img src={s.icon} alt={s.title} className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="font-semibold text-xs sm:text-sm">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* calendar + time slots */}
          <div
            className={`flex flex-col gap-6 sm:gap-10 lg:flex-row ${
              !service ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <div className="flex-shrink-0 w-full sm:w-auto scale-100 sm:scale-105 md:scale-110 origin-top-left">
              <BookingCalendar
                date={date}
                setDate={(d) => {
                  setDate(d);
                  setTime("");
                }}
                disabled={!service}
                fullyBookedDates={fullyBookedDates}
              />
            </div>

            {date && (
              <div className="w-full max-w-full lg:max-w-[320px]">
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
            className={`btn btn-accent w-full text-sm sm:text-base ${
              !service || !date || !time ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            {t.dashboard.booking.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
