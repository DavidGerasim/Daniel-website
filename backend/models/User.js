import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,

  // 🔐 Password reset
  passwordResetToken: String,
  passwordResetExpires: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
