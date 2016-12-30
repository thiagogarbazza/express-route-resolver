'use strict';

const HttpStatus = require('http-status-codes');
const winston = require('winston');

module.exports = function onError(response, error) {
  // Never cache errors
  response.set({'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'});

  if (error.name === 'BusinessError') {
    return response
      .status(HttpStatus.PRECONDITION_FAILED)
      .json({
        error: error.errors,
        message: error.message
      });
  }

  winston.error('There was an unexpected error', error);

  return response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
};
