import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// פונקציה לבדוק תקינות אימייל
const isValidEmail = (email) => {
  // בדיקה בסיסית למבנה תקין
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// פונקציה לבדוק תקינות טלפון ישראלי (10 ספרות, רק מספרים)
const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

router.post("/", async (req, res) => {
  try {
    let { firstname, lastname, email, password, phone } = req.body;
    if (!firstname || !lastname || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();
    const name = `${firstname} ${lastname}`;

    // בדיקת תקינות אימייל
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // בדיקת תקינות טלפון
    if (!isValidPhone(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // בדיקות סיסמה
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }
    if (!/[0-9]/.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one special character",
      });
    }

    // הצפנת סיסמה ושמירה במסד
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, phone });
    await user.save();

    // יצירת JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
