// api/stats.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/users-count", async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    res.status(200).json({ count: usersCount });
  } catch (error) {
    console.error("Error getting users count:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
