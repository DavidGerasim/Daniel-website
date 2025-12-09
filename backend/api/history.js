import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// GET history route
router.get("/", async (req, res) => {
  try {
    console.log("📩 Request received at /api/history");

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.warn("⚠️ No Authorization header");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.warn("⚠️ No token found in Authorization header");
      return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token verified:", decoded);
    } catch (err) {
      console.error("❌ Invalid token:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      console.warn("❌ User not found for ID:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    const history = user.treatmentHistory || [];
    console.log(`📄 Sending history for user ${user.email}:`, history);

    res.status(200).json(history);
  } catch (err) {
    console.error("🔥 Server error in /api/history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
