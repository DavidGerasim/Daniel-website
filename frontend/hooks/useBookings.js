// hooks/useBookings.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMyBookings,
  getBookedTimes,
  createBooking,
  deleteBooking,
} from "@/services/bookings.api";

export function useBookings() {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  // טעינת תורים של המשתמש
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
          return;
        }

        const data = await getMyBookings(token);
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);

        if (err.message === "Invalid token" || err.message === "Unauthorized") {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
    };

    loadBookings();
  }, [router]);

  // טעינת שעות תפוסות
  const loadBookedTimes = async (date) => {
    try {
      const data = await getBookedTimes(date);
      setBookedTimes(data);
    } catch {
      setBookedTimes([]);
    }
  };

  // יצירת תור
  const bookTreatment = async ({ service, date, time }) => {
    setError("");

    try {
      const token = localStorage.getItem("token");
      const result = await createBooking({ service, date, time }, token);

      setBookings((prev) => [result.booking, ...prev]);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  // מחיקת תור
  const confirmDelete = async () => {
    if (!bookingToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await deleteBooking(bookingToDelete._id, token);

      setBookings((prev) => prev.filter((b) => b._id !== bookingToDelete._id));
      setBookingToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    bookings,
    bookedTimes,
    error,
    showSuccess,
    bookingToDelete,

    setBookingToDelete,
    loadBookedTimes,
    bookTreatment,
    confirmDelete,
  };
}
