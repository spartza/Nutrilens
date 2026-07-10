export const parseApiError = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  return error?.message || "An unexpected error occurred. Please try again.";
};
