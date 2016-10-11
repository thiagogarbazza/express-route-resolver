'use strict';
const HttpStatus = require('http-status-codes');
const onError = require('./on-error');

module.exports = function onCreate(response, promise) {
  return promise
    .then(result => response.status(HttpStatus.CREATED).json(result))
    .catch(error => onError(response, error));
};
