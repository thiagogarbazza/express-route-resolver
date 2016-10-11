'use strict';
const onCreate = require('./src/on-create');
const onDestroy = require('./src/on-destroy');
const onError = require('./src/on-error');
const onFind = require('./src/on-find');
const onUpdate = require('./src/on-update');

module.exports = {
  onCreate,
  onDestroy,
  onError,
  onFind,
  onUpdate
};
