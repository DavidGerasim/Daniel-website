import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// POST
router.post("/", auth, async (req, res) => {
  const { service, date, time } = req.body;

  try {
    const booking = await Booking.create({
      service,
      date,
      time,
      userId: req.userId,
    });

    res.status(201).json({ booking });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "This time slot is already booked" });
    }

    res.status(500).json({ message: "Booking failed" });
  }
});

// GET booked time slots for a date
router.get("/", async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const bookings = await Booking.find({ date }).select("time -_id");
    const bookedTimes = bookings.map((b) => b.time);

    res.json(bookedTimes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// GET
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(5);

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    const now = new Date();

    if (bookingDateTime <= now) {
      return res
        .status(403)
        .json({ message: "Past bookings cannot be cancelled" });
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled" });
  } catch {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

export default router;
