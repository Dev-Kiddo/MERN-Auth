export const customErrHandler = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;

  return error;
};
