import { EMAIL_RX } from "./constants";

export const validateLogin = (email, password) => {
  const err = {};
  if (!email || !email.trim()) err.email = "Email is required";
  else if (!EMAIL_RX.test(email)) err.email = "Invalid email";
  if (!password) err.password = "Password is required";
  else if (password.length < 6)
    err.password = "Password must be at least 6 characters";
  return err;
};

export const validateSignup = (firstName, lastName, email, password) => {
  const err = {};
  if (!firstName || !firstName.trim()) err.firstName = "First name is required";
  if (!lastName || !lastName.trim()) err.lastName = "Last name is required";

  if (!email || !email.trim()) err.email = "Email is required";
  else if (!EMAIL_RX.test(email)) err.email = "Invalid email";
  if (!password) err.password = "Password is required";
  else if (password.length < 6)
    err.password = "Password must be at least 6 characters";
  return err;
};

export const validateForgotPassword = (email, newPassword, confirmPassword) => {
  const err = {};

  if (!email.trim()) err.email = "Email is required";
  else if (!EMAIL_RX.test(email)) err.email = "Invalid email";

  if (!newPassword) err.newPassword = "New password is required";
  else if (newPassword.length < 6)
    err.newPassword = "Password must be at least 6 characters";

  if (!confirmPassword) err.confirmPassword = "Please confirm password";
  else if (newPassword !== confirmPassword)
    err.confirmPassword = "Passwords do not match";

  return err;
};
