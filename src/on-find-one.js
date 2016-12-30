'use strict';

const HttpStatus = require('http-status-codes');
const onError = require('./on-error');

module.exports = function onFindOne(response, promise) {
  return promise
    .then(result => {
      if (result) {
        return response.json(result);
      }

      return response.sendStatus(HttpStatus.NOT_FOUND);
    })
    .catch(error => onError(response, error));
};
