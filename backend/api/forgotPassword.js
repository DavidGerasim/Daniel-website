// backend/api/forgotPassword.js
import express from "express";
import crypto from "crypto";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("📩 Forgot password request received");

  try {
    const { email } = req.body;

    console.log("➡️ Raw email:", email);

    if (!email) {
      console.log("❌ Email missing in request");
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    console.log("🔍 Normalized email:", normalizedEmail);

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      console.log("⚠️ No user found for this email");
      return res.json({
        message: "If this email exists, a reset link was sent",
      });
    }

    console.log("✅ User found:", user._id.toString());

    // 🔐 יצירת טוקן
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetToken = resetTokenHash;
    user.passwordResetExpires = Date.now() + 1000 * 60 * 15;

    await user.save();

    console.log("🔑 Reset token generated");
    console.log(
      "⏳ Token expires at:",
      new Date(user.passwordResetExpires).toISOString()
    );

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    console.log("🔗 Password reset link:", resetLink);

    res.json({ message: "If this email exists, a reset link was sent" });
  } catch (err) {
    console.error("🔥 Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
