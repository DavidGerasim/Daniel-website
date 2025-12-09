import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log("📩 Request received at /api/login");
    console.log("Request body:", req.body);

    if (!email) {
      console.log("❌ Email not provided");
      return res.status(400).json({ message: "Email is required" });
    }

    email = email.toLowerCase().trim();
    console.log("Processed email:", email);

    const user = await User.findOne({ email });
    console.log("DB lookup result:", user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login successful, token generated:", token);

    res.status(200).json({
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("🔥 Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
