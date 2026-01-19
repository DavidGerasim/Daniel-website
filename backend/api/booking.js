// api/booking.js
import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// --- Auth middleware ---
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Auth check, token:", token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// --- POST new booking ---
router.post("/", auth, async (req, res) => {
  const { service, date, time } = req.body;
  console.log("POST /bookings, body:", req.body);

  try {
    const booking = await Booking.create({
      service,
      date,
      time,
      userId: req.userId,
    });

    console.log("Booking created:", booking);
    res.status(201).json({ booking });
  } catch (err) {
    console.error("Booking creation failed:", err);
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "This time slot is already booked" });
    }
    res.status(500).json({ message: "Booking failed" });
  }
});

// --- GET booked time slots for a date ---
router.get("/", async (req, res) => {
  const { date } = req.query;
  console.log("GET /bookings?date=", date);

  if (!date) {
    console.log("Date not provided");
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const bookings = await Booking.find({ date }).select("time -_id");
    console.log(
      `Found ${bookings.length} bookings for date ${date}:`,
      bookings
    );

    const bookedTimes = bookings.map((b) => b.time);
    console.log("Booked times array:", bookedTimes);

    res.json(bookedTimes);
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// --- GET my bookings ---
router.get("/my", auth, async (req, res) => {
  console.log("GET /bookings/my for user:", req.userId);

  try {
    const bookings = await Booking.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(10);

    console.log("User bookings found:", bookings);
    res.json(bookings);
  } catch (err) {
    console.error("Failed to fetch user bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// --- DELETE a booking ---
router.delete("/:id", auth, async (req, res) => {
  console.log("DELETE /bookings/:id, id:", req.params.id);

  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!booking) {
      console.log("Booking not found");
      return res.status(404).json({ message: "Booking not found" });
    }

    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    const now = new Date();
    console.log("Booking datetime:", bookingDateTime, "Now:", now);

    if (bookingDateTime <= now) {
      console.log("Cannot cancel past booking");
      return res
        .status(403)
        .json({ message: "Past bookings cannot be cancelled" });
    }

    await booking.deleteOne();
    console.log("Booking deleted successfully");

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error("Failed to delete booking:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

// --- GET fully booked dates ---
router.get("/fully-booked-dates", async (req, res) => {
  try {
    const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00–20:00
    const now = new Date();

    const bookings = await Booking.find().select("date time");

    // group by date
    const map = {};
    bookings.forEach((b) => {
      if (!map[b.date]) map[b.date] = [];
      // keep only future bookings
      const dt = new Date(`${b.date}T${b.time}`);
      if (dt > now) map[b.date].push(b.time);
    });

    const fullyBookedDates = [];

    for (const date of Object.keys(map)) {
      // remaining hours that are still in HOURS and not past
      const futureHours = HOURS.filter((hour) => {
        const dt = new Date(`${date}T${hour}:00`);
        return dt > now;
      });

      // אם כל השעות שנותרו תפוסות
      const bookedTimes = map[date];
      if (bookedTimes.length >= futureHours.length) {
        fullyBookedDates.push(date);
      }
    }

    console.log("Map:", map);
    console.log("Fully booked dates:", fullyBookedDates);

    res.json(fullyBookedDates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch fully booked dates" });
  }
});

export default router;
