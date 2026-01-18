"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";

// utils
import { validatePassword } from "@/utils/passwordRules";
import { validateEmailInput } from "@/utils/emailValidation";
import { validatePhoneInput } from "@/utils/phoneValidation";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PasswordToggleInput from "@/components/PasswordToggleInput";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmError, setConfirmError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [serverError, setServerError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;

    const phoneValidationMsg = validatePhoneInput(phone);
    if (phoneValidationMsg) {
      setPhoneError(phoneValidationMsg);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || "Something went wrong");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      console.error("Unexpected error:", err);
      setServerError("Server error. Please try again later.");
    }
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

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder="0501234567"
              value={phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setPhone(value);
                setPhoneError(validatePhoneInput(value));
              }}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
            />

            {phoneError && (
              <p className="text-red-400 text-sm mt-1">{phoneError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <PasswordToggleInput
              value={password}
              onChange={handlePasswordChange}
              placeholder="********"
              errorMessages={passwordErrors}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <PasswordToggleInput
              value={confirmPassword}
              onChange={handleConfirmChange}
              placeholder="********"
              errorMessages={confirmError ? [confirmError] : []}
            />
          </div>

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

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
