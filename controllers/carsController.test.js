const { carsService } = require('../services');
const { carsController } = require('./index');

const mockCar1 = { plate: 'node123', color: 'red', brand: 'toyota', available: true };
const mockCar2 = { plate: 'js123', color: 'blue', brand: 'ford', available: true };

describe('carsController', () => {
  describe('post on /cars', () => {
    test('when plate is alreagy registered shoul return error', () => {
      const req = { body: { plate: mockCar1.plate, color: mockCar1.color, brand: mockCar1.brand } };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      const errorObj = {
        error: true,
        statusCode: 409,
        message: 'Plate already registered.',
      };

      jest.spyOn(carsService, 'create').mockReturnValueOnce(errorObj);

      carsController.carsPost(req, res);
      expect(res.status).toHaveBeenCalledWith(errorObj.statusCode);
      expect(res.json).toHaveBeenCalledWith({ message: errorObj.message });
    });

    test('should call service layer and return 201', () => {
      const req = { body: { plate: mockCar1.plate, color: mockCar1.color, brand: mockCar1.brand } };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(carsService, 'create').mockReturnValueOnce(mockCar1);

      carsController.carsPost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCar1);
    });
  });

  describe('put on /cars/:id', () => {
    test('should return error if car could not be updated', () => {
      const req = {
        body: { color: mockCar1.color, brand: mockCar1.brand },
        params: { plate: mockCar1.plate },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const expectedReturn = {
        error: true,
        statusCode: 404,
        message: 'Car not found.',
      };
      jest.spyOn(carsService, 'update').mockReturnValueOnce(expectedReturn);

      carsController.carsPut(req, res);
      expect(res.status).toHaveBeenCalledWith(expectedReturn.statusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedReturn.message });
    });

    test('shoud call service layer and return 200', () => {
      const req = {
        body: { color: mockCar1.color, brand: mockCar1.brand },
        params: { plate: mockCar1.plate },
      };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(carsService, 'update').mockReturnValueOnce(mockCar1);

      carsController.carsPut(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCar1);
    });
  });

  describe('delete on /cars/:id', () => {
    test('should call service layer and return 204', () => {
      const req = { params: { plate: mockCar1.plate } };
      const res = {
        status: jest.fn(),
        send: jest.fn(),
      };

      jest.spyOn(carsService, 'remove');

      carsController.carsDelete(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });

  describe('get on /cars', () => {
    test('should call service layer and return 200', () => {
      const req = { query: { color: undefined, brand: undefined } };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(carsService, 'listAll').mockReturnValueOnce([mockCar1, mockCar2]);

      carsController.carsGet(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockCar1, mockCar2]);
    });
  });

  describe('get on /cars/:id', () => {
    test('should call service layer and return 200', () => {
      const req = { params: { plate: mockCar1.plate } };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(carsService, 'listByPlate').mockReturnValueOnce(mockCar1);

      carsController.carsGetWithParams(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCar1);
    });
  });
});
