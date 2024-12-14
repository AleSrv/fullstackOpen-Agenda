export const handleError = (
  setErrorMessage,
  setIsError,
  message,
  timeout = 3000
) => {
  setErrorMessage(message);
  setIsError(true);
  setTimeout(() => {
    setIsError(false);
    setErrorMessage(null);
  }, timeout);
};
