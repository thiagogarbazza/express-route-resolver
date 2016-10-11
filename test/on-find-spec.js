'use strict';
const onFind = require('../src/on-find');

describe('on-find', () => {
  const RESULT_RESOLVE = [{
    id: '1234',
    nome: 'Test route resovle 1234'
  }, {
    id: '1235',
    nome: 'Test route resovle 1235'
  }];
  const RESULT_REJECT = {};
  let response;

  before(() => {
    mockery.registerMock('../src/on-error', (error, response) => response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR));
    mockery.registerAllowable('../src/on-find');
  });

  after(() => {
    mockery.deregisterMock('../src/on-error');
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
        done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);
    onFind(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      })
      .catch(done);
  });
});
