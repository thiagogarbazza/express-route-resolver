'use strict';
const HttpStatus = require('http-status-codes');
const onError = require('./on-error');

module.exports = function onDestroy(response, promise) {
  return promise
    .then(result => {
      if (result) {
        return response.sendStatus(HttpStatus.NO_CONTENT);
      }
      return response.sendStatus(HttpStatus.NOT_FOUND);
    })
    .catch(error => onError(response, error));
};
