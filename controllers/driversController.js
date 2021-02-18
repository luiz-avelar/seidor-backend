const { Router } = require('express');
const { driversService } = require('../services/index');
const middlewares = require('../middlewares/index');

const drivers = Router();

drivers.post('/', middlewares.validateDriverName, async (req, res) => {
  const { name } = req.body;

  const registeredDriver = driversService.create(name);

  return res.status(201).json(registeredDriver);
});

drivers.put('/:id', middlewares.validateDriverName, middlewares.validateDriverId, (req, res) => {
  const { name } = req.body;
  let { id } = req.params;
  id = parseInt(id);

  const driver = driversService.update(id, name);

  if (driver.error) return res.status(driver.statusCode).json({ message: driver.message });

  return res.status(200).json(driver);
});

drivers.delete('/:id', middlewares.validateDriverId, async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  driversService.remove(id);

  return res.status(204).send();
});

drivers.get('/', (req, res) => {
  const { name } = req.query;
  const driversList = driversService.listAll(name);
  return res.status(200).json(driversList);
});

drivers.get('/:id', middlewares.validateDriverId, (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const driver = driversService.listById(id);
  return res.status(200).json(driver);
});

module.exports = drivers;
