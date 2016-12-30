'use strict';

const mockery = require('mockery');
const winston = require('winston');

winston.level = 'off';

mockery.enable();
mockery.warnOnUnregistered(false);
mockery.warnOnReplace(false);
