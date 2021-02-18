const db = require('./connection');

const create = (name) => {
  const id = db.drivers.length + 1;
  const driver = { id, name, available: true };
  db.drivers.push(driver);
  return driver;
};

const update = (id, name) => {
  const driver = db.drivers.find((driver) => driver.id === id);
  const index = db.drivers.findIndex((driver) => driver.id === id);
  db.drivers[index] = { id: driver.id, name, available: driver.available };
  return db.drivers[index];
};

const listById = (id) => db.drivers.find((driver) => driver.id === id) || [];

const remove = (id) => {
  const index = db.drivers.findIndex((driver) => driver.id === id);
  db.drivers.splice(index, 1);
};

const listAll = () => db.drivers;

const toggleAvailability = (id) => {
  const driver = db.drivers.find((driver) => driver.id === id);
  const index = db.drivers.findIndex((driver) => driver.id === id);
  db.drivers[index] = { id: driver.id, name: driver.name, available: !driver.available };
  return db.drivers[index];
};

module.exports = {
  create,
  update,
  listById,
  remove,
  listAll,
  toggleAvailability,
};
