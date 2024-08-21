export const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;

  const response = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  res.status(statusCode).json(response);
};
