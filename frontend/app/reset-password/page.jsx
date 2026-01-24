// frontend/app/reset-password/page.jsx
"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/utils/authApi";
import { validatePassword } from "@/utils/passwordRules";
import PasswordToggleInput from "@/components/PasswordToggleInput";
import { Label } from "@/components/ui/label";
import { useI18n } from "../i18nProvider";
import { dictionaries } from "../i18n";

const ResetPassword = () => {
  const { lang } = useI18n();
  const t = dictionaries[lang];
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmError, setConfirmError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (value) => {
    setPassword(value);
    const validation = validatePassword(value);
    setPasswordErrors(validation.errors);
  };

  const handleConfirmChange = (value) => {
    setConfirm(value);
    setConfirmError(value !== password ? "Passwords do not match" : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validation = validatePassword(password);
    if (!validation.isValid) {
      setPasswordErrors(validation.errors);
      return;
    }

    if (password !== confirm) {
      setConfirmError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ token, password });
      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <p className="text-center text-red-500 mt-20">
        Invalid or expired reset link
      </p>
    );
  }

  return (
    <section className="h-screen flex items-center justify-center bg-primary">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          {t.resetPassword.title}
        </h2>

        <div>
          <Label className="text-white">{t.resetPassword.newPassword}</Label>
          <PasswordToggleInput
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="Enter new password"
            errorMessages={passwordErrors}
          />
        </div>

        <div>
          <Label className="text-white">
            {t.resetPassword.confirmPassword}
          </Label>
          <PasswordToggleInput
            value={confirm}
            onChange={(e) => handleConfirmChange(e.target.value)}
            placeholder="Confirm new password"
            errorMessages={confirmError ? [confirmError] : []}
          />
        </div>

        {serverError && (
          <p className="text-red-400 text-sm text-center">{serverError}</p>
        )}

        {success && (
          <p className="text-green-400 text-sm text-center">
            {t.resetPassword.successMsg}
          </p>
        )}

        <button disabled={loading} className="btn btn-accent w-full">
          {loading ? t.resetPassword.saving : t.resetPassword.resetBtn}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
