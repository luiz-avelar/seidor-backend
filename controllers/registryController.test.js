const { registryService } = require('../services');
const { registryController } = require('./index');

const availableCar = { plate: 'var123', color: 'blue', brand: 'renault', available: true };
const unavailableCar = { plate: 'const123', color: 'yellow', brand: 'renault', available: false };
const availableDriver = { id: 1, name: 'Carlos', available: true };
const unavailableDriver = { id: 2, name: 'Rogério', available: false };

const mockRegistry1 = {
  startDate: '14/02/2021',
  endDate: '',
  driver: 1,
  car: 'var123',
  reason: 'no reason',
};

const mockRegistry2 = {
  startDate: '15/02/2021',
  endDate: '16/02/20201',
  driver: 2,
  car: 'const123',
  reason: 'could not get a uber',
};

describe('registryController', () => {
  describe('post on /registry', () => {
    test('when received error from service layer should return it', () => {
      const req = {
        body: {
          startDate: mockRegistry1.startDate,
          driver: String(mockRegistry1.driver),
          car: mockRegistry1.car,
          reason: mockRegistry1.reason,
        },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      const expectedReturn = { error: true, statusCode: 409, message: 'Driver unavailable.' };

      jest.spyOn(registryService, 'create').mockReturnValueOnce(expectedReturn);

      registryController.registryPost(req, res);
      expect(res.status).toHaveBeenCalledWith(expectedReturn.statusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedReturn.message });
    });

    test('should call service layer and return 201', () => {
      const req = {
        body: {
          startDate: mockRegistry1.startDate,
          driver: String(mockRegistry1.driver),
          car: mockRegistry1.car,
          reason: mockRegistry1.reason,
        },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(registryService, 'create').mockReturnValueOnce(mockRegistry1);

      registryController.registryPost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockRegistry1);
    });
  });

  describe('put on /registry/:id', () => {
    test('should return error if registry could not be updated', () => {
      const req = {
        body: { endDate: mockRegistry2.endDate },
        params: { id: mockRegistry1.id },
      };

      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      const expectedReturn = { error: true, statusCode: 404, message: 'Registry not found.' };

      jest.spyOn(registryService, 'update').mockReturnValueOnce(expectedReturn);

      registryController.registryPut(req, res);
      expect(res.status).toHaveBeenCalledWith(expectedReturn.statusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedReturn.message });
    });

    test('shoud call service layer and return 200', () => {
      const req = {
        body: { endDate: mockRegistry2.endDate },
        params: { id: mockRegistry1.id },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(registryService, 'update').mockReturnValueOnce(mockRegistry1);

      registryController.registryPut(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockRegistry1);
    });
  });

  describe('get on /registry', () => {
    test('should call service layer and return 200', () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(registryService, 'listAll').mockReturnValueOnce([mockRegistry1, mockRegistry2]);

      registryController.registryGet(...Array(1), res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockRegistry1, mockRegistry2]);
    });
  });
});
