// utils/passwordRules.jsx

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

  if (password.length < minLength)
    errors.push(`Password must be at least ${minLength} characters`);

  if (requireNumber && !/\d/.test(password))
    errors.push("Password must contain at least one number");

  if (requireUppercase && !/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter");

  if (requireLowercase && !/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter");

  if (requireSpecialChar && !/[!@#$%^&*]/.test(password))
    errors.push("Password must contain at least one special character");

  return {
    isValid: errors.length === 0,
    errors,
  };
}
