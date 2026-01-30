// frontend/utils/passwordRules.jsx
export const passwordRules = {
  minLength: 8,
  requireNumber: true,
  requireUppercase: true,
  requireLowercase: true,
  requireSpecialChar: true,
};

export function validatePassword(password) {
  const {
    minLength,
    requireNumber,
    requireUppercase,
    requireLowercase,
    requireSpecialChar,
  } = passwordRules;

  let errors = [];

  if (password.length < minLength) errors.push("minLength");
  if (requireNumber && !/\d/.test(password)) errors.push("number");
  if (requireUppercase && !/[A-Z]/.test(password)) errors.push("uppercase");
  if (requireLowercase && !/[a-z]/.test(password)) errors.push("lowercase");
  if (requireSpecialChar && !/[!@#$%^&*]/.test(password))
    errors.push("special");

  return {
    isValid: errors.length === 0,
    errors,
  };
}
