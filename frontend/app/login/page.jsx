// frontend/app/login/page.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

// utils
import { validateEmailInput } from "@/utils/emailValidation";
import { loginUser } from "@/utils/authApi";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PasswordToggleInput from "@/components/PasswordToggleInput";

const Login = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang];

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedService = searchParams.get("service");
  const [serverError, setServerError] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    setWrongPassword(false);
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push(
        selectedService
          ? `/dashboard?service=${encodeURIComponent(selectedService)}`
          : "/dashboard"
      );
    } catch (err) {
      if (err.message.toLowerCase().includes("password")) {
        setWrongPassword(true);
      } else {
        setServerError(err.message || "Server is not responding");
      }
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
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-700/70 backdrop-blur-xl rounded-2xl p-10 flex flex-col gap-8 shadow-2xl shadow-black/50 border border-white/10">
        <h2 className="text-3xl font-bold text-white text-center">
          {t.auth.login.title}
        </h2>
        <p className="text-white/70 text-center mb-4">
          {t.auth.login.description}
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-white">
              {t.auth.login.email}
            </Label>
            <Input
              id="email"
              type="text"
              placeholder={t.auth.login.emailPlaceholder}
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setEmailError(validateEmailInput(value));
              }}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                  setEmailError(t.auth.login.emailSpaceError);
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
              {t.auth.login.password}
            </Label>
            <PasswordToggleInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              errorMessages={[]}
            />
          </div>

          {/* Server Error */}
          {serverError && (
            <p className="text-red-400 text-sm text-center">{serverError}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-accent w-full flex items-center justify-center gap-2"
          >
            <span>
              {loading ? t.auth.login.loggingIn : t.auth.login.loginBtn}
            </span>

            <HiOutlineArrowLongRight
              className={`transition-transform ${
                lang === "he" ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Forgot Password */}
          {wrongPassword && (
            <p className="text-red-400 text-sm text-center mt-2">
              {t.auth.login.forgotPasswordText}{" "}
              <a
                href="/forgot-password"
                className="underline text-red-300 hover:text-red-400 transition"
              >
                {t.auth.login.forgotPasswordLink}
              </a>
            </p>
          )}
        </form>

        <p className="text-white/60 text-center">
          {t.auth.login.signupText}{" "}
          <a
            href={
              selectedService
                ? `/signup?service=${encodeURIComponent(selectedService)}`
                : "/signup"
            }
            className="text-accent font-semibold text-lg hover:brightness-125 transition"
          >
            {t.auth.login.signupLink}
          </a>
        </p>
      </div>
    </motion.section>
  );
};

export default Login;
