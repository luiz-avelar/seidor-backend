const db = require('./connection');

const listByPlate = (plate) => db.cars.find((car) => car.plate === plate);

const create = (plate, color, brand) => {
  const car = { plate, color, brand, available: true };
  db.cars.push(car);
  return db.cars[db.cars.length - 1];
};

const update = (plate, color, brand) => {
  const car = db.cars.find((car) => car.plate === plate);
  const index = db.cars.findIndex((car) => car.plate === plate);
  db.cars[index] = {
    plate,
    color: color || car.color,
    brand: brand || car.brand,
    available: car.available,
  };
  return db.cars[index];
};

const remove = (plate) => {
  const index = db.cars.findIndex((car) => car.plate === plate);
  db.cars.splice(index, 1);
};

const listAll = () => db.cars;

const toggleAvailability = (plate) => {
  const car = db.cars.find((car) => car.plate === plate);
  const index = db.cars.findIndex((car) => car.plate === plate);
  db.cars[index] = {
    plate: car.plate,
    color: car.color,
    brand: car.brand,
    available: !car.available,
  };
  return db.cars[index];
};

module.exports = {
  listByPlate,
  create,
  update,
  remove,
  listAll,
  toggleAvailability,
};
