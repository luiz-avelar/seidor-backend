const { carsService } = require('./index');
const { carsModel } = require('../models');

const mockCar1 = { plate: 'node123', color: 'red', brand: 'toyota', available: true };
const mockCar2 = { plate: 'js123', color: 'blue', brand: 'ford', available: true };
const mockCar3 = { plate: 'express123', color: 'red', brand: 'ford', available: true };

describe('Cars Service', () => {
  describe('create', () => {
    test('when the plate informed is already register should return conflict error', () => {
      jest.spyOn(carsModel, 'listByPlate').mockReturnValueOnce(mockCar1);
      const modelCall = jest.spyOn(carsModel, 'create');
      const expectedReturn = {
        error: true,
        statusCode: 409,
        message: 'Plate already registered.',
      };
      expect(carsService.create(mockCar1.plate, mockCar1.color, mockCar1.brand)).toEqual(
        expectedReturn,
      );
      expect(modelCall).not.toHaveBeenCalled();
    });

    test('register a car successfully', () => {
      jest.spyOn(carsModel, 'listByPlate').mockReturnValueOnce(undefined);
      const modelCall = jest.spyOn(carsModel, 'create');
      expect(carsService.create(mockCar1.plate, mockCar1.color, mockCar1.brand)).toEqual(mockCar1);
      expect(modelCall).toHaveBeenCalledWith(mockCar1.plate, mockCar1.color, mockCar1.brand);
    });
  });

  describe('update', () => {
    test('when plate informed is not registered should return not found error', () => {
      jest.spyOn(carsModel, 'listByPlate').mockReturnValueOnce(undefined);
      const modelCall = jest.spyOn(carsModel, 'update');
      const errorReturn = { error: true, statusCode: 404, message: 'Car not found.' };
      expect(carsService.update(mockCar1.plate, mockCar1.color, mockCar1.brand)).toEqual(
        errorReturn,
      );
      expect(modelCall).not.toHaveBeenCalled();
    });

    test('update a car successfully', () => {
      jest.spyOn(carsModel, 'listByPlate');
      const modelCall = jest.spyOn(carsModel, 'update');
      expect(carsService.update(mockCar1.plate, mockCar1.color, mockCar1.brand)).toEqual(mockCar1);
      expect(modelCall).toHaveBeenCalledWith(mockCar1.plate, mockCar1.color, mockCar1.brand);
    });
  });

  describe('remove', () => {
    test('a car can be successfully deleted', () => {
      const modelCall = jest.spyOn(carsModel, 'remove');
      carsService.remove(mockCar1.plate);
      expect(modelCall).toHaveBeenCalledWith(mockCar1.plate);
    });
  });

  describe('listAll', () => {
    const modelCall = jest
      .spyOn(carsModel, 'listAll')
      .mockReturnValue([mockCar1, mockCar2, mockCar3]);

    test('return cars filtered by color and brand', () => {
      const carsList = carsService.listAll('red', 'ford');
      expect(carsList).toEqual([mockCar3]);
      expect(modelCall).toHaveBeenCalled();
    });

    test('return cars filtered by only brand', () => {
      const carsList = carsService.listAll(undefined, 'ford');
      expect(carsList).toEqual([mockCar2, mockCar3]);
      expect(modelCall).toHaveBeenCalled();
    });

    test('return cars filtered by only color', () => {
      expect(carsService.listAll('red', undefined)).toEqual([mockCar1, mockCar3]);
      expect(modelCall).toHaveBeenCalled();
    });

    test('return cars unfiltered', () => {
      expect(carsService.listAll(undefined, undefined)).toEqual([mockCar1, mockCar2, mockCar3]);
      expect(modelCall).toHaveBeenCalled();
    });
  });

  describe('listByPlate', () => {
    test('call model layer successfully', () => {
      const modelCall = jest.spyOn(carsModel, 'listByPlate');
      carsService.listByPlate(mockCar1.plate);
      expect(modelCall).toHaveBeenCalledWith(mockCar1.plate);
    });
  });
});
