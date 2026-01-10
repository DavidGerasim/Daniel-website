"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { validateEmailInput } from "@/utils/emailValidation";
import { useRouter } from "next/navigation";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PasswordToggleInput from "@/components/PasswordToggleInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Login failed");
        return;
      }

      // שמירת token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // מעבר לדשבורד
      router.push("/dashboard");
    } catch (err) {
      setServerError("Server is not responding");
    } finally {
      setLoading(false);
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
      <div
        className="
    w-full max-w-md
    bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-700/70
    backdrop-blur-xl
    rounded-2xl
    p-10
    flex flex-col gap-8
    shadow-2xl shadow-black/50
    border border-white/10
    transition-transform duration-300 ease-in-out
  "
      >
        <h2 className="text-3xl font-bold text-white text-center">Welcome</h2>
        <p className="text-white/70 text-center mb-4">
          Please login to your account
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="text"
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

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <PasswordToggleInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              errorMessages={[]}
            />
          </div>

          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent w-full flex items-center justify-center gap-2"
          >
            <span>{loading ? "Logging in..." : "Login"}</span>
            <HiOutlineArrowLongRight />
          </button>
        </form>

        <p className="text-white/60 text-center">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-accent font-semibold text-lg hover:brightness-125 transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </motion.section>
  );
};

export default Login;
