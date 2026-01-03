"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"; // תיקון
import { validatePassword } from "@/utils/passwordRules";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmError, setConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const result = validatePassword(value);
    setPasswordErrors(result.errors);

    if (confirmPassword) {
      setConfirmError(
        value === confirmPassword ? "" : "Passwords do not match"
      );
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmError(value === password ? "" : "Passwords do not match");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="h-screen flex items-center justify-center bg-primary"
    >
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-700/70 backdrop-blur-xl rounded-2xl p-10 flex flex-col gap-8 shadow-2xl shadow-black/50 border border-white/10">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Account
        </h2>
        <p className="text-white/70 text-center mb-4">
          Please fill in your details to sign up
        </p>

        <form className="flex flex-col gap-6">
          {/* First & Last Name */}
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="firstname" className="text-white">
                First Name
              </Label>
              <Input
                id="firstname"
                type="text"
                placeholder="First Name"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="lastname" className="text-white">
                Last Name
              </Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Last Name"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@gmail.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="050 123 4567"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent pr-10"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
            {passwordErrors.length > 0 && (
              <ul className="text-red-400 text-sm mt-1 list-disc list-inside">
                {passwordErrors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={handleConfirmChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent pr-10"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-white"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <HiOutlineEyeOff size={20} />
                ) : (
                  <HiOutlineEye size={20} />
                )}
              </button>
            </div>
            {confirmError && (
              <p className="text-red-400 text-sm mt-1">{confirmError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-accent w-full flex items-center justify-center gap-2"
            type="submit"
          >
            <span>Sign Up</span>
            <HiOutlineArrowLongRight />
          </button>
        </form>

        {/* Login Link */}
        <p className="text-white/60 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-accent font-semibold text-lg hover:brightness-125 transition"
          >
            Login
          </a>
        </p>
      </div>
    </motion.section>
  );
};

export default SignUp;
