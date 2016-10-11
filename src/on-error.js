'use strict';
const HttpStatus = require('http-status-codes');

module.exports = function onError(response, error) {
  if (error.name === 'BusinessError') {
    return response
      .status(HttpStatus.PRECONDITION_FAILED)
      .json({
        error: error.errors,
        message: error.message
      });
  }
  return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
};
