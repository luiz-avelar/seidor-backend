const { driversService } = require('../services/index');

const driversPost = (req, res) => {
  const { name } = req.body;

  const registeredDriver = driversService.create(name);

  res.status(201);
  return res.json(registeredDriver);
};

const driversPut = (req, res) => {
  const { name } = req.body;
  let { id } = req.params;
  id = parseInt(id);

  const driver = driversService.update(id, name);

  if (driver.error) {
    res.status(driver.statusCode);
    return res.json({ message: driver.message });
  }

  res.status(200);
  return res.json(driver);
};

const driversDelete = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  driversService.remove(id);

  res.status(204);
  return res.send();
};

const driversGet = (req, res) => {
  const { name } = req.query;
  const driversList = driversService.listAll(name);
  res.status(200);
  return res.json(driversList);
};

const driversGetWithParams = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const driver = driversService.listById(id);
  res.status(200);
  return res.json(driver);
};

module.exports = {
  driversPost,
  driversPut,
  driversDelete,
  driversGet,
  driversGetWithParams,
};
