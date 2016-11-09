'use strict';
const {expect} = require('chai');
const HttpStatus = require('http-status-codes');
const mockery = require('mockery');
const simpleMock = require('simple-mock');
const winston = require('winston');

mockery.enable();
mockery.warnOnUnregistered(false);
mockery.warnOnReplace(false);

global.expect = expect;
global.HttpStatus = HttpStatus;
global.mockery = mockery;
global.simpleMock = simpleMock;

winston.level = 'off';
