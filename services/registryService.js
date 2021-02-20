const { registryModel, driversModel, carsModel } = require('../models');

const create = (startDate, driver, car, reason) => {
  const { available: driverAvailable } = driversModel.listById(driver);

  if (!driverAvailable) return { error: true, statusCode: 409, message: 'Driver unavailable.' };

  const { available: carAvailable } = carsModel.listByPlate(car);

  if (!carAvailable) return { error: true, statusCode: 409, message: 'Car unavailable.' };

  driversModel.toggleAvailability(driver);
  carsModel.toggleAvailability(car);

  return registryModel.create(startDate, driver, car, reason);
};

const update = (id, endDate) => {
  const registry = registryModel.listById(id);

  if (Object.keys(registry).length === 0)
    return { error: true, statusCode: 404, message: 'Registry not found.' };

  if (registry.endDate !== '')
    return { error: true, statusCode: 409, message: 'Car usage already finished.' };

  driversModel.toggleAvailability(registry.driver);
  carsModel.toggleAvailability(registry.car);

  return registryModel.update(id, endDate);
};

const listAll = () => {
  const registriesList = registryModel.listAll();
  const carsList = carsModel.listAll();
  const driversList = driversModel.listAll();

  return registriesList.map((registry) => {
    carInfo = carsList.find((car) => car.plate === registry.car);
    driverInfo = driversList.find((driver) => driver.id === registry.driver);
    registry.car = carInfo;
    registry.driver = driverInfo;
    return registry;
  });
};

module.exports = { create, update, listAll };
