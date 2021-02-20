const db = require('./connection');

const create = (startDate, driver, car, reason) => {
  const id = db.registries.length + 1;
  const registry = { id, startDate, endDate: '', driver, car, reason };
  db.registries.push(registry);
  return db.registries[db.registries.length - 1];
};

const listById = (id) => db.registries.find((registry) => registry.id === id) || [];

const update = (id, endDate) => {
  const index = db.registries.findIndex((registry) => registry.id === id);
  db.registries[index].endDate = endDate;
  return db.registries.find((registry) => registry.id === id);
};

const listAll = () => db.registries;

module.exports = {
  create,
  listById,
  update,
  listAll,
};
