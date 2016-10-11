'use strict';
const onUpdate = require('../src/on-update');

describe('on-update', () => {
  const RESULT_REJECT = {};
  let response;

  before(() => {
    mockery.registerMock('../src/on-error', (error, response) => response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR));
    mockery.registerAllowable('../src/on-update');
  });

  after(() => {
    mockery.deregisterMock('../src/on-error');
  });

  beforeEach(() => {
    response = {};
  });

  it('shold be response.status as NO_CONTENT', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onUpdate(response, Promise.resolve([1]))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.NO_CONTENT);
        done();
      })
      .catch(done);
  });

  it('shold be response.status as NOT_FOUND', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onUpdate(response, Promise.resolve([0]))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.NOT_FOUND);
        done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onUpdate(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      })
      .catch(done);
  });

});
