'use strict';

const {expect} = require('chai');
const HttpStatus = require('http-status-codes');
const mockery = require('mockery');
const simpleMock = require('simple-mock');

const RESULT_REJECT = {};
const RESULT_RESOLVE = [{
  id: '1234',
  nome: 'Test route resovle 1234'
}, {
  id: '1235',
  nome: 'Test route resovle 1235'
}];

function onErrorMock(response) {
  response.status = HttpStatus.INTERNAL_SERVER_ERROR;
}

describe('on-find', () => {
  let onFind;
  let response;

  before(() => {
    mockery.registerMock('./on-error', onErrorMock);
    mockery.registerAllowable('../src/on-find');
    onFind = require('../src/on-find');
  });

  after(() => {
    mockery.deregisterMock('./on-error');
  });

  beforeEach(() => {
    response = {};
  });

  it('shold be response.status as OK', done => {
    response.json = simpleMock.stub().returnWith(response);

    onFind(response, Promise.resolve(RESULT_RESOLVE))
      .then(() => {
        expect(response.json.callCount).to.equal(1);
        expect(response.json.lastCall.arg).to.deep.equal(RESULT_RESOLVE);

        return done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    onFind(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.status).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);

        return done();
      })
      .catch(done);
  });
});
