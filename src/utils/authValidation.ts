const emailPattern = /^(?![.])[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i;

export const validateEmail = (email: string) => {
  if (!email.trim()) {
    return "Email is required.";
  }

  if (!emailPattern.test(email.trim())) {
    return "Please enter a valid email address.";
  }

  return "";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must include uppercase, lowercase, and a number.";
  }

  return "";
};

export const validateLoginPassword = (password: string) => {
  if (!password) {
    return "Password is required.";
  }

  return "";
};

export const validateName = (name: string) => {
  if (!name.trim()) {
    return "Name is required.";
  }

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (name.trim().length > 50) {
    return "Name must be at most 50 characters.";
  }

  return "";
};

const mobilePattern = /^[0-9+\s\-()]{7,15}$/;

export const validateMobileNumber = (mobileNumber: string) => {
  if (!mobileNumber.trim()) {
    return "Mobile number is required.";
  }

  if (!mobilePattern.test(mobileNumber.trim())) {
    return "Please enter a valid mobile number.";
  }

  return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword) {
    return "Please confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
};

export const validateCode = (code: string) => {
  if (!code.trim()) {
    return "Verification code is required.";
  }

  if (!/^\d{6}$/.test(code.trim())) {
    return "Please enter the 6-digit code from your email.";
  }

  return "";
};
