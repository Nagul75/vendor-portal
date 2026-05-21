const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "An unexpected server error occurred.";

  console.error(`Error [${status}] - ${message}`);

  res.status(status).json({ success: false, message });
};

export default errorHandler;
