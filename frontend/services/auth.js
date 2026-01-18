// services/auth.js

// מביא את הטוקן מה־localStorage
export function getToken() {
  return localStorage.getItem("token");
}

// מנקה את ה־auth במקרה של logout או token לא תקין
export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
