"use client";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Login = () => {
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
        <h2 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h2>
        <p className="text-white/70 text-center mb-4">
          Please login to your account
        </p>

        <form className="flex flex-col gap-6">
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@gmail.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
              required
            />
          </div>

          <button className="btn btn-accent w-full flex items-center justify-center gap-2">
            <span>Login</span>
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
