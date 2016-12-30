'use strict';

const {expect} = require('chai');
const HttpStatus = require('http-status-codes');
const mockery = require('mockery');
const simpleMock = require('simple-mock');

const RESULT_REJECT = {};

function onErrorMock(response) {
  response.status = HttpStatus.INTERNAL_SERVER_ERROR;
}

describe('on-delete', () => {
  let onDelete;
  let response;

  before(() => {
    mockery.registerMock('./on-error', onErrorMock);
    mockery.registerAllowable('../src/on-delete');
    onDelete = require('../src/on-delete');
  });

  after(() => {
    mockery.deregisterMock('./on-error');
  });

  beforeEach(() => {
    response = {};
  });

  it('shold be response.status as NO_CONTENT', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onDelete(response, Promise.resolve(1))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.NO_CONTENT);

        return done();
      })
      .catch(done);
  });

  it('shold be response.status as NOT_FOUND', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onDelete(response, Promise.resolve(0))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.NOT_FOUND);

        return done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    onDelete(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);

        return done();
      })
      .catch(done);
  });
});
