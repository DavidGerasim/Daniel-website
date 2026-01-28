// frontend/services/bookings.api.js
import { getToken, clearAuth } from "./auth";

const BASE_URL = "http://localhost:5000/api/bookings";

function getAuthHeaders() {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

// היסטוריית תורים
export async function fetchMyBookings() {
  const res = await fetch(`${BASE_URL}/my`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      // unauthorized
      clearAuth();
      throw new Error("Unauthorized");
    }
    throw new Error(data.message || "Failed to fetch history");
  }

  return Array.isArray(data) ? data : [];
}

// שעות תפוסות
export async function fetchBookedTimes(dateString) {
  const res = await fetch(`${BASE_URL}?date=${dateString}`);
  const data = await res.json();
  return data;
}

// יצירת תור חדש
export async function createBooking({ serviceId, date, time }) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ serviceId, date, time }), // ✅ עכשיו backend יקבל את השדה הנכון
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create booking");
  }

  return data.booking;
}

// מחיקת תור
export async function deleteBookingById(bookingId) {
  const res = await fetch(`${BASE_URL}/${bookingId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete booking");
  }

  return true;
}

export async function fetchFullyBookedDates(service) {
  const res = await fetch(
    `${BASE_URL}/fully-booked-dates${service ? `?service=${service}` : ""}`
  );
  const data = await res.json();

  if (!res.ok) throw new Error("Failed to fetch fully booked dates");

  return data;
}
