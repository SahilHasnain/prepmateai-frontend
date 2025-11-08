// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password length (minimum 8 characters)
export const validatePassword = (password) => {
  return password.length >= 8;
};
