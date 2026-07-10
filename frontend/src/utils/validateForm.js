export const validateRegister = (name, email, password) => {
  const errors = {};
  if (!name || name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please provide a valid email address";
  }
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  return errors;
};

export const validateLogin = (email, password) => {
  const errors = {};
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Please provide a valid email address";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  return errors;
};
