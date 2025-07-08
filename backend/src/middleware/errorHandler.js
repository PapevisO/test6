const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError('Route Not Found', 404));
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode
  });
};

module.exports = { notFound, errorHandler };
