const { Router } = require('express');
const middleware = require('../middlewares/index');
const { carsService } = require('../services/index');

const cars = Router();

cars.post('/', middleware.validateCreateCarInfo, (req, res) => {
  const { plate, color, brand } = req.body;

  const registeredCar = carsService.create(plate, color, brand);

  if (registeredCar.error) {
    return res.status(registeredCar.statusCode).json({ message: registeredCar.message });
  }

  return res.status(201).json(registeredCar);
});

cars.put('/:plate', (req, res) => {
  const { plate } = req.params;
  const { color, brand } = req.body;

  const updatedCar = carsService.update(plate, color, brand);

  if (updatedCar.error) {
    return res.status(updatedCar.statusCode).json({ message: updatedCar.message });
  }

  return res.status(200).json(updatedCar);
});

cars.delete('/:plate', (req, res) => {
  const { plate } = req.params;

  carsService.remove(plate);

  return res.status(204).send();
});

cars.get('/', (req, res) => {
  const { color, brand } = req.query;
  const everyCar = carsService.listAll(color, brand);
  return res.status(200).json(everyCar);
});

cars.get('/:plate', (req, res) => {
  const { plate } = req.params;

  const car = carsService.listByPlate(plate);

  return res.status(200).json(car);
});

module.exports = cars;
