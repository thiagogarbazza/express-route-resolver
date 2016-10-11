'use strict';
const onCreate = require('./src/on-create');
const onDelete = require('./src/on-delete');
const onError = require('./src/on-error');
const onFind = require('./src/on-find');
const onFindOne = require('./src/on-find-one');
const onUpdate = require('./src/on-update');

module.exports = {
  onCreate,
  onDelete,
  onError,
  onFind,
  onFindOne,
  onUpdate
};
