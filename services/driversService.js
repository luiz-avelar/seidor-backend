const { driversModel } = require('../models/index');

const create = (name) => driversModel.create(name);

const update = (id, name) => {
  const driverExists = driversModel.listById(id);

  if (driverExists.length === 0) {
    return {
      error: true,
      statusCode: 404,
      message: 'Driver not found.',
    };
  }

  return driversModel.update(id, name);
};

const remove = (id) => driversModel.remove(id);

const listById = (id) => driversModel.listById(id);

const listAll = (name) => {
  const driversList = driversModel.listAll();
  if (name) return driversList.filter((driver) => driver.name === name);
  return driversList;
};

module.exports = {
  create,
  update,
  remove,
  listById,
  listAll,
};
