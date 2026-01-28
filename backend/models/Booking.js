// backend/models/booking.model.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceId: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ date: 1, time: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
