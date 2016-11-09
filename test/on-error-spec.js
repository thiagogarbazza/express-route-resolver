'use strict';
const onError = require('../src/on-error');

const BUSINESS_ERROR = {
  errors: [{
    code: 'test'
  }, {
    code: 'test'
  }],
  message: 'has a business error',
  name: 'BusinessError'
};

describe('on-error', () => {
  let response;

  beforeEach(() => {
    response = {};
  });

  it('shold be response.status as INTERNAL_SERVER_ERROR', () => {
    const error = new Error('A any error');
    response.sendStatus = simpleMock.stub().returnWith(response);

    onError(response, error);
    expect(response.sendStatus.callCount).to.equal(1);
    expect(response.sendStatus.lastCall.arg).to.equal(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('shold be response.status as PRECONDITION_FAILED', () => {
    response.status = simpleMock.stub().returnWith(response);
    response.json = simpleMock.stub().returnWith(response);

    const RESULT = {
      error: [{
        code: 'test'
      }, {
        code: 'test'
      }],
      message: 'has a business error'
    };

    onError(response, BUSINESS_ERROR);
    expect(response.status.callCount).to.equal(1);
    expect(response.status.lastCall.arg).to.equal(HttpStatus.PRECONDITION_FAILED);
    expect(response.json.callCount).to.equal(1);
    expect(response.json.lastCall.arg).to.deep.equal(RESULT);
  });
});
