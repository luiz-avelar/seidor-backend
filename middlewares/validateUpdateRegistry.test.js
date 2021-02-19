const { validateUpdateRegistry } = require('./index');

describe('Check if endDate in the request', () => {
  test('Request received missing endDate name should return a 401', () => {
    const req = { body: { endDate: null } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateUpdateRegistry(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing end date.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Request received with driver name should call next middleware', () => {
    const req = { body: { endDate: '18/02/2021' } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateUpdateRegistry(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
