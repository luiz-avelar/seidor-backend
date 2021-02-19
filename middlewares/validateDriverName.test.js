const { validateDriverName } = require('./index');

describe('Check if driver name is in the request', () => {
  test('Request received missing driver name should return a 401', () => {
    const req = { body: { name: null } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateDriverName(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing driver name.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Request received with driver name should call next middleware', () => {
    const req = { body: { name: 'David' } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateDriverName(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
