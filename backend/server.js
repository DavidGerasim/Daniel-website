// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import signup from "./api/signup.js";
import login from "./api/login.js";
import bookings from "./api/booking.js";
import statsRoutes from "./api/stats.js";
import forgotPassword from "./api/forgotPassword.js";
import resetPassword from "./api/resetPassword.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/bookings", bookings);
app.use("/api/stats", statsRoutes);
app.use("/api/forgot-password", forgotPassword);
app.use("/api/reset-password", resetPassword);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
