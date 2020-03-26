const CustomError = require('./custom-error');

function handleError(res, error) {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send(error);
  }

  res.status(400).send(error);
}

module.exports = handleError;