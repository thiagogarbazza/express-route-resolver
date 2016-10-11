'use strict';
const onCreate = require('../src/on-create');

describe('on-create', () => {
  const RESULT_RESOLVE = {
    id: '1234',
    nome: 'Test route resovle'
  };
  const RESULT_REJECT = {};
  let response;

  before(() => {
    mockery.registerMock('../src/on-error', (error, response) => response.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR));
    mockery.registerAllowable('../src/on-create');
  });

  after(() => {
    mockery.deregisterMock('../src/on-error');
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
        done();
      })
      .catch(done);
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', done => {
    response.sendStatus = simpleMock.stub().returnWith(response);

    onCreate(response, Promise.reject(RESULT_REJECT))
      .then(() => {
        expect(response.sendStatus.callCount).to.equal(1);
        expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
        done();
      })
      .catch(done);
  });
});
