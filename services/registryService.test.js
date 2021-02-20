const { registryService } = require('./index');
const { carsModel, driversModel, registryModel } = require('../models');

const availableCar = { plate: 'var123', color: 'blue', brand: 'renault', available: true };
const unavailableCar = { plate: 'const123', color: 'yellow', brand: 'renault', available: false };
const availableDriver = { id: 1, name: 'Carlos', available: true };
const unavailableDriver = { id: 2, name: 'Rogério', available: false };

const mockRegistry1 = {
  startDate: '14/02/2021',
  endDate: '19/02/20201',
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

describe('Registry Service', () => {
  describe('create', () => {
    const mockRequest = {...mockRegistry1}
    delete mockRequest.endDate
    test('when a driver is unavailable should return error', () => {
      jest.spyOn(driversModel, 'listById').mockReturnValueOnce(unavailableDriver);
      const expectedReturn = { error: true, statusCode: 409, message: 'Driver unavailable.' };
      expect(registryService.create(mockRequest)).toEqual(expectedReturn);
    });

    test('when a car is unavailable should return error', () => {
      jest.spyOn(carsModel, 'listByPlate').mockReturnValueOnce(unavailableCar);
      jest.spyOn(driversModel, 'listById').mockReturnValueOnce(availableDriver);
      const expectedReturn = { error: true, statusCode: 409, message: 'Car unavailable.' };
      expect(registryService.create(mockRequest)).toEqual(expectedReturn);
    });

    test('model layer should be successfully called', () => {
      jest.spyOn(carsModel, 'listByPlate').mockReturnValueOnce(availableCar);
      jest.spyOn(driversModel, 'listById').mockReturnValueOnce(availableDriver);
      const toggleCarAvailability = jest
        .spyOn(carsModel, 'toggleAvailability')
        .mockReturnValueOnce({ ...availableCar, available: false });
      const toggleDriverAvailability = jest
        .spyOn(driversModel, 'toggleAvailability')
        .mockReturnValueOnce({ ...availableDriver, available: false });
      jest.spyOn(registryModel, 'create').mockReturnValueOnce(mockRegistry1);

      expect(
        registryService.create(
          mockRegistry1.startDate,
          mockRegistry1.driver,
          mockRegistry1.car,
          mockRegistry1.reason,
        ),
      ).toEqual(mockRegistry1);
      expect(toggleCarAvailability).toHaveBeenCalledWith(mockRegistry1.car);
      expect(toggleDriverAvailability).toHaveBeenCalledWith(mockRegistry1.driver);
    });
  });

  describe('update', () => {
    test("when registry's id informed is not valid should return not found error", () => {
      jest.spyOn(registryModel, 'listById').mockReturnValueOnce({});
      const modelCall = jest.spyOn(registryModel, 'update');
      const errorReturn = { error: true, statusCode: 404, message: 'Registry not found.' };
      expect(registryService.update(mockRegistry1.id, mockRegistry1.endDate)).toEqual(errorReturn);
      expect(modelCall).not.toHaveBeenCalled();
    });

    test('when registry has endDate it should not be updated and return error', () => {
      jest.spyOn(registryModel, 'listById').mockReturnValueOnce(mockRegistry1);
      const modelCall = jest.spyOn(registryModel, 'update');
      const errorReturn = { error: true, statusCode: 409, message: 'Car usage already finished.' };
      expect(registryService.update(mockRegistry1.id, mockRegistry1.endDate)).toEqual(errorReturn);
      expect(modelCall).not.toHaveBeenCalled();
    })

    test('model layer should sucessfully be called', () => {
      jest.spyOn(registryModel, 'listById').mockReturnValueOnce({ ...mockRegistry1, endDate: '' });

      const modelCall = jest.spyOn(registryModel, 'update').mockReturnValueOnce(mockRegistry1);
      const toggleCarAvailability = jest
        .spyOn(carsModel, 'toggleAvailability')
        .mockReturnValueOnce(availableCar);
      const toggleDriverAvailability = jest
        .spyOn(driversModel, 'toggleAvailability')
        .mockReturnValueOnce(availableDriver);
      expect(registryService.update(mockRegistry1.id, mockRegistry1.endDate)).toEqual(
        mockRegistry1,
      );
      expect(modelCall).toHaveBeenCalledWith(mockRegistry1.id, mockRegistry1.endDate);
      expect(toggleCarAvailability).toHaveBeenCalledWith(mockRegistry1.car);
      expect(toggleDriverAvailability).toHaveBeenCalledWith(mockRegistry1.driver);
    });
  });

  describe('listAll', () => {
    const modelCall = jest
      .spyOn(registryModel, 'listAll')
      .mockReturnValue([mockRegistry1, mockRegistry2]);

    test('return every registry successfully', () => {
      jest.spyOn(carsModel, 'listAll').mockReturnValue([availableCar, unavailableCar]);
      jest.spyOn(driversModel, 'listAll').mockReturnValue([availableDriver, unavailableDriver]);

      expect(registryService.listAll()).toEqual([
        { ...mockRegistry1, car: availableCar, driver: availableDriver },
        { ...mockRegistry2, car: unavailableCar, driver: unavailableDriver },
      ]);
      expect(modelCall).toHaveBeenCalled();
    });
  });
});
