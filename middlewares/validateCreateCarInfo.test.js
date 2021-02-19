const { validateCreateCarInfo } = require('./index');

const mockCar = { plate: 'node123', color: 'red', brand: 'tesla' };

describe('Check info to create a car', () => {
  test('Request received missing plate should return a 401', () => {
    const req = { body: { plate: null, color: mockCar.color, brand: mockCar.brand } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateCreateCarInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing car information.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Request received missing color should return a 401', () => {
    const req = { body: { plate: mockCar.plate, color: null, brand: mockCar.brand } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateCreateCarInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing car information.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Request received missing brand should return a 401', () => {
    const req = { body: { plate: mockCar.plate, color: mockCar.color, brand: null } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateCreateCarInfo(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing car information.' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Correct request should call next middleware', () => {
    const req = { body: mockCar };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    validateCreateCarInfo(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
