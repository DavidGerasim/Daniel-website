// frontend/app/forgot-password/page.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

// utils
import { validateEmailInput } from "@/utils/emailValidation";
import { forgotPassword } from "@/utils/authApi";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess(false);

    const validationError = validateEmailInput(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setLoading(true);

    try {
      await forgotPassword(email); // 🔐 קריאה אמיתית ל־API
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setServerError(
        err.message || "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.3, duration: 0.4, ease: "easeIn" },
      }}
      className="h-screen flex items-center justify-center bg-primary"
    >
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-700/70 backdrop-blur-xl rounded-2xl p-10 flex flex-col gap-8 shadow-2xl shadow-black/50 border border-white/10">
        <h2 className="text-3xl font-bold text-white text-center">
          Forgot Password
        </h2>

        <p className="text-white/70 text-center">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@gmail.com"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setEmailError(validateEmailInput(value));
              }}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                  setEmailError("Email address cannot contain spaces");
                }
              }}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
            />

            {emailError && (
              <p className="text-red-400 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          {success && (
            <p className="text-green-400 text-sm text-center">
              If this email exists, a reset link has been sent.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent w-full flex items-center justify-center gap-2"
          >
            <span>{loading ? "Sending..." : "Send Reset Link"}</span>
            <HiOutlineArrowLongRight />
          </button>
        </form>

        <p className="text-white/60 text-center">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-accent font-semibold hover:brightness-125 transition"
          >
            Back to login
          </a>
        </p>
      </div>
    </motion.section>
  );
};

export default ForgotPassword;
