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

describe('on-create', () => {
  let onCreate;
  let response;

  before(() => {
    mockery.registerMock('./on-error', onErrorMock);
    mockery.registerAllowable('../src/on-create');
    onCreate = require('../src/on-create');
  });

  after(() => {
    mockery.deregisterMock('./on-error');
  });

  beforeEach(() => {
    response = {};
  });

  it('shold be response.status as CREATED', done => {
    response.status = simpleMock.stub().returnWith(response);
    response.json = simpleMock.stub().returnWith(response);

    onCreate(response, Promise.resolve(RESULT_RESOLVE))
      .then(() => {
        expect(response.status.callCount).to.equal(1);
        expect(response.status.lastCall.arg).to.equal(HttpStatus.CREATED);

        expect(response.json.callCount).to.equal(1);
        expect(response.json.lastCall.arg).to.deep.equal(RESULT_RESOLVE);

        return done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    onCreate(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);

        return done();
      })
      .catch(done);
  });
});
