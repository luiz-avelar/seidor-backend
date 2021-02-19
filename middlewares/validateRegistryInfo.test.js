const { validateRegistryInfo } = require('./index');

const mockRegistry = { startDate: '12/01/2021', driver: 1, car: 'node123', reason: 'emergency' };

describe('Check registry info provided', () => {
  test('Request received missing startDate should return a 401', () => {
    const req = {
      body: {
        startDate: null,
        driver: mockRegistry.driver,
        car: mockRegistry.car,
        reason: mockRegistry.reason,
      },
    };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateRegistryInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing registry info.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Request received missing driver should return a 401', () => {
    const req = {
      body: {
        startDate: mockRegistry.startDate,
        driver: null,
        car: mockRegistry.car,
        reason: mockRegistry.reason,
      },
    };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateRegistryInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing registry info.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Request received missing brand should return a 401', () => {
    const req = {
      body: {
        startDate: mockRegistry.startDate,
        driver: mockRegistry.driver,
        car: null,
        reason: mockRegistry.reason,
      },
    };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateRegistryInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing registry info.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Request received missing brand should return a 401', () => {
    const req = {
      body: {
        startDate: mockRegistry.startDate,
        driver: mockRegistry.driver,
        car: mockRegistry.car,
        reason: null,
      },
    };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateRegistryInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing registry info.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Correct request should call next middleware', () => {
    const req = { body: mockRegistry };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateRegistryInfo(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
