import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema({
  date: Date,
  service: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  treatmentHistory: [treatmentSchema],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
