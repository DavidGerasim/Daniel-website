// utils/phoneValidation.jsx

export const isValidPhone = (phone) => {
  return /^[0][0-9]{9}$/.test(phone);
};

export const validatePhoneInput = (phone) => {
  if (!phone) return "Phone number is required";
  if (!/^[0-9]+$/.test(phone)) return "Phone number can only contain digits";
  if (!phone.startsWith("0")) return "Phone number must start with 0";
  if (phone.length !== 10) return "Phone number must be exactly 10 digits";
  return "";
};
