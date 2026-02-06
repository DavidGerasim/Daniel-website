// frontend/utils/authApi.jsx
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signupUser = async ({
  firstname,
  lastname,
  email,
  password,
  phone,
}) => {
  const res = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, lastname, email, password, phone }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

// 🔐 Forgot Password
export const forgotPassword = async (email) => {
  const res = await fetch(`${API_URL}/api/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send reset link");
  return data;
};

// 🔐 Reset Password
export const resetPassword = async ({ token, password }) => {
  const res = await fetch(`${API_URL}/api/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Reset failed");
  return data;
};
