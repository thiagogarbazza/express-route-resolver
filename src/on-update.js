'use strict';

const {isEmpty} = require('lodash');
const HttpStatus = require('http-status-codes');
const onError = require('./on-error');

module.exports = function onUpdate(response, promise) {
  return promise
    .then(result => {
      if (!isEmpty(result) && result.shift()) {
        return response.sendStatus(HttpStatus.NO_CONTENT);
      }

      return response.sendStatus(HttpStatus.NOT_FOUND);
    })
    .catch(error => onError(response, error));
};
