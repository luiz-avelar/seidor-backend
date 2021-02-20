const { registryService } = require('../services');

const registryPost = (req, res) => {
  // Data de início - startDate - string
  // Motorista - driver - ID registrado no sistema - int
  // Carro - car - Placa do carro registrado no sistema - string
  const { startDate, car, reason } = req.body;
  let { driver } = req.body;
  driver = parseInt(driver);

  const registry = registryService.create(startDate, driver, car, reason);

  if (registry.error) {
    res.status(registry.statusCode);
    return res.json({ message: registry.message });
  }

  res.status(201);
  return res.json(registry);
};

const registryPut = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const { endDate } = req.body;

  const registry = registryService.update(id, endDate);

  if (registry.error) {
    res.status(registry.statusCode);
    return res.json({ message: registry.message });
  }

  res.status(200);
  return res.json(registry);
};

const registryGet = (_req, res) => {
  const registriesList = registryService.listAll();

  res.status(200);
  return res.json(registriesList);
};

module.exports = {
  registryPost,
  registryPut,
  registryGet,
};
