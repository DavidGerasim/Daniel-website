// utils/emailValidation.jsx
export const hasSpaces = (value) => value.includes(" ");

export const hasInvalidEmailChars = (value) => /[^a-zA-Z0-9@._-]/.test(value);

export const hasMultipleAt = (value) => (value.match(/@/g) || []).length > 1;

export const validateEmailInput = (value) => {
  if (!value) return "";
  if (hasSpaces(value)) return "Email address cannot contain spaces";
  if (hasInvalidEmailChars(value))
    return "Only English letters, numbers and valid symbols are allowed";
  if (hasMultipleAt(value)) return "Email cannot contain more than one '@'";
  return "";
};
