"use client";
import { Input } from "@/components/ui/input";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useState } from "react";

export default function PasswordToggleInput({
  value,
  onChange,
  placeholder,
  errorMessages = [],
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent"
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2 text-white"
          onClick={() => setShow(!show)}
        >
          {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </button>
      </div>
      {errorMessages.length > 0 && (
        <ul className="text-red-400 text-sm mt-1 list-disc list-inside">
          {errorMessages.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
