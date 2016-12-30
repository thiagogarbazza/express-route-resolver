'use strict';

const onError = require('./on-error');

module.exports = function onFind(response, promise) {
  return promise
    .then(result => response.json(result))
    .catch(error => onError(response, error));
};
