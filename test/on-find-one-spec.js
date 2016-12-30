'use strict';

const {expect} = require('chai');
const HttpStatus = require('http-status-codes');
const mockery = require('mockery');
const simpleMock = require('simple-mock');

const RESULT_REJECT = {};
const RESULT_RESOLVE = {
  id: '1234',
  nome: 'Test route resovle'
};

function onErrorMock(response) {
  response.status = HttpStatus.INTERNAL_SERVER_ERROR;
}

describe('on-find-one', () => {
  let onFindOne;
  let response;

  before(() => {
    mockery.registerMock('./on-error', onErrorMock);
    mockery.registerAllowable('../src/on-find-one');
    onFindOne = require('../src/on-find-one');
  });

  after(() => {
    mockery.deregisterMock('./on-error');
  });

  beforeEach(() => {
    response = {};
  });

  it('shold be response.status as OK', done => {
    response.json = simpleMock.stub().returnWith(response);

    onFindOne(response, Promise.resolve(RESULT_RESOLVE))
      .then(() => {
        expect(response.json.callCount).to.equal(1);
        expect(response.json.lastCall.arg).to.equal(RESULT_RESOLVE);

        return done();
      })
      .catch(done);
  });

  it('shold be response.status as NOT_FOUND', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onFindOne(response, Promise.resolve(null))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.NOT_FOUND);

        return done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    onFindOne(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);

        return done();
      })
      .catch(done);
  });
});
