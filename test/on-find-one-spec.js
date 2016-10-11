'use strict';
const onFindOne = require('../src/on-find-one');

describe('on-find-one', () => {
  const RESULT_RESOLVE = {
    id: '1234',
    nome: 'Test route resovle'
  };
  const RESULT_REJECT = {};
  let response;

  before(() => {
    mockery.registerMock('../src/on-error', (error, response) => response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR));
    mockery.registerAllowable('../src/on-find-one');
  });

  after(() => {
    mockery.deregisterMock('../src/on-error');
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
        done();
      })
      .catch(done);
  });

  it('shold be response.status as NOT_FOUND', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onFindOne(response, Promise.resolve(null))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.NOT_FOUND);
        done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onFindOne(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      })
      .catch(done);
  });
});
