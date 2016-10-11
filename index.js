'use strict';
const onCreate = require('./src/on-create');
const onError = require('./src/on-error');
const onUpdate = require('./src/on-update');

module.exports = {
  onCreate,
  onError,
  onUpdate
};
