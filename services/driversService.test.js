const { driversService } = require('./index');
const { driversModel } = require('../models');

const mockDriver1 = { id: 1, name: 'Carlos', available: false };
const mockDriver2 = { id: 2, name: 'Rogério', available: false };

describe('Drivers Service', () => {
  describe('create', () => {
    test('model layer called successfully', () => {
      const modelCall = jest.spyOn(driversModel, 'create');
      driversService.create(mockDriver1.name);
      expect(modelCall).toHaveBeenCalledWith(mockDriver1.name);
    });
  });

  describe('update', () => {
    test("when driver's id informed is not registered should return not found error", () => {
      jest.spyOn(driversModel, 'listById').mockReturnValueOnce({});
      const modelCall = jest.spyOn(driversModel, 'update');
      const errorReturn = { error: true, statusCode: 404, message: 'Driver not found.' };
      expect(driversService.update(mockDriver1.id, mockDriver2.name)).toEqual(errorReturn);
      expect(modelCall).not.toHaveBeenCalled();
    });

    test('update driver successfully', () => {
      jest.spyOn(driversModel, 'listById').mockReturnValueOnce(mockDriver1);
      const expectedReturn = {
        id: mockDriver1.id,
        name: mockDriver2.name,
        available: mockDriver1.available,
      };
      const modelCall = jest.spyOn(driversModel, 'update').mockReturnValueOnce(expectedReturn);
      expect(driversService.update(mockDriver1.id, mockDriver2.name)).toEqual(expectedReturn);
      expect(modelCall).toHaveBeenCalledWith(mockDriver1.id, mockDriver2.name);
    });
  });

  describe('remove', () => {
    test('a driver can be successfully deleted', () => {
      const modelCall = jest.spyOn(driversModel, 'remove');
      driversService.remove(mockDriver1.id);
      expect(modelCall).toHaveBeenCalledWith(mockDriver1.id);
    });
  });

  describe('listAll', () => {
    const modelCall = jest
      .spyOn(driversModel, 'listAll')
      .mockReturnValue([mockDriver1, mockDriver2]);

    test('return drivers filtered by name', () => {
      const driversList = driversService.listAll(mockDriver1.name);
      expect(driversList).toEqual([mockDriver1]);
      expect(modelCall).toHaveBeenCalled();
    });

    test('returns every driver', () => {
      expect(driversService.listAll(undefined)).toEqual([mockDriver1, mockDriver2]);
      expect(modelCall).toHaveBeenCalled();
    });
  });

  describe('listById', () => {
    test('call model layer successfully', () => {
      const modelCall = jest.spyOn(driversModel, 'listById');
      driversModel.listById(mockDriver1.id);
      expect(modelCall).toHaveBeenCalledWith(mockDriver1.id);
    });
  });
});
