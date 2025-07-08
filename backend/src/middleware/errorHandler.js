const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError('Route Not Found', 404));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.locals.errorMessage = message;
  res.status(err.statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode
  });
};

module.exports = { notFound, errorHandler };
