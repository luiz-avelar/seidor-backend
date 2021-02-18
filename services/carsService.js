const { carsModel } = require('../models/index');

const create = (plate, color, brand) => {
  const carExists = carsModel.listByPlate(plate);
  if (carExists) {
    return {
      error: true,
      statusCode: 409,
      message: 'Plate already registered.',
    };
  }

  return carsModel.create(plate, color, brand);
};

const update = (plate, color, brand) => {
  const carExists = carsModel.listByPlate(plate);

  if (!carExists) {
    return {
      error: true,
      statusCode: 404,
      message: 'Car not found.',
    };
  }

  return carsModel.update(plate, color, brand);
};

const remove = (plate) => carsModel.remove(plate);

const listAll = (color, brand) => {
  const carsList = carsModel.listAll();
  if (color && brand) return carsList.filter((car) => car.brand === brand && car.color === color);
  else if (brand) return carsList.filter((car) => car.brand === brand);
  else if (color) return carsList.filter((car) => car.color === color);
  return carsList;
};

const listByPlate = (plate) => {
  const car = carsModel.listByPlate(plate);
  if (!car) return [];
  return car;
};

module.exports = {
  create,
  update,
  remove,
  listAll,
  listByPlate,
};
