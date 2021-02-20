const { driversService } = require('../services');
const driversController = require('./driversController');

const mockDriver1 = { id: 1, name: 'Carlos', available: false };
const mockDriver2 = { id: 2, name: 'Rogério', available: false };

describe('driversController', () => {
  describe('post on /drivers', () => {
    test('should call service layer and return 201', () => {
      const req = { body: { name: mockDriver1.name } };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      jest.spyOn(driversService, 'create').mockReturnValueOnce(mockDriver1);

      driversController.driversPost(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockDriver1);
    });
  });

  describe('put on /drivers/:id', () => {
    test('should return error if driver could not be updated', () => {
      const req = { body: { name: mockDriver1.name }, params: String(mockDriver1.id) };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const expectedReturn = {
        error: true,
        statusCode: 404,
        message: 'Driver not found.',
      };
      jest.spyOn(driversService, 'update').mockReturnValueOnce(expectedReturn);

      driversController.driversPut(req, res);
      expect(res.status).toHaveBeenCalledWith(expectedReturn.statusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedReturn.message });
    });

    test('shoud call service layer and return 200', () => {
      const req = { body: { name: mockDriver1.name }, params: String(mockDriver1.id) };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(driversService, 'update').mockReturnValueOnce({
        id: mockDriver1.id,
        name: mockDriver2.name,
        available: mockDriver1.available,
      });

      driversController.driversPut(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: mockDriver1.id,
        name: mockDriver2.name,
        available: mockDriver1.available,
      });
    });
  });

  describe('delete on /drivers/:id', () => {
    test('should call service layer and return 204', () => {
      const req = { params: String(mockDriver1.id) };
      const res = {
        status: jest.fn(),
        send: jest.fn(),
      };

      jest.spyOn(driversService, 'remove');

      driversController.driversDelete(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith();
    });
  });

  describe('get on /drivers', () => {
    test('should call service layer and return 200', () => {
      const req = { query: { name: undefined } };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(driversService, 'listAll').mockReturnValueOnce([mockDriver1, mockDriver2]);

      driversController.driversGet(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockDriver1, mockDriver2]);
    });
  });

  describe('get on /drivers/:id', () => {
    test('should call service layer and return 200', () => {
      const req = { params: { id: mockDriver1.id } };
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      jest.spyOn(driversService, 'listById').mockReturnValueOnce(mockDriver1);

      driversController.driversGetWithParams(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDriver1);
    });
  });
});
