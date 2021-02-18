const { Router } = require('express');
const middleware = require('../middlewares');
const { registryService } = require('../services');

const registry = Router();

registry.post('/', middleware.validateRegistryInfo, (req, res) => {
  // Data de início - startDate - string
  // Motorista - driver - ID registrado no sistema - int
  // Carro - car - Placa do carro registrado no sistema - string
  const { startDate, car, reason } = req.body;
  let { driver } = req.body;
  driver = parseInt(driver);

  const registry = registryService.create(startDate, driver, car, reason);

  if (registry.error) return res.status(registry.statusCode).json({ message: registry.message });

  return res.status(201).json(registry);
});

registry.put('/:id', middleware.validateUpdateRegistry, (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const { endDate } = req.body;

  const registry = registryService.update(id, endDate);

  if (registry.error) return res.status(registry.statusCode).json({ message: registry.message });

  return res.status(200).json(registry);
});

registry.get('/', (req, res) => {
  const registriesList = registryService.listAll();
  return res.status(200).json(registriesList);
});

module.exports = registry;
