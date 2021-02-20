const { carsService } = require('../services/index');

const carsPost = (req, res) => {
  const { plate, color, brand } = req.body;

  const registeredCar = carsService.create(plate, color, brand);

  if (registeredCar.error) {
    res.status(registeredCar.statusCode);
    return res.json({ message: registeredCar.message });
  }

  res.status(201);
  return res.json(registeredCar);
};

const carsPut = (req, res) => {
  const { plate } = req.params;
  const { color, brand } = req.body;

  const updatedCar = carsService.update(plate, color, brand);

  if (updatedCar.error) {
    res.status(updatedCar.statusCode);
    return res.json({ message: updatedCar.message });
  }

  res.status(200);
  return res.json(updatedCar);
};

const carsDelete = (req, res) => {
  const { plate } = req.params;

  carsService.remove(plate);

  res.status(204);
  return res.send();
};

const carsGet = (req, res) => {
  const { color, brand } = req.query;
  const everyCar = carsService.listAll(color, brand);
  res.status(200);
  return res.json(everyCar);
};

const carsGetWithParams = (req, res) => {
  const { plate } = req.params;

  const car = carsService.listByPlate(plate);

  res.status(200);
  return res.json(car);
};

module.exports = {
  carsPost,
  carsPut,
  carsDelete,
  carsGet,
  carsGetWithParams,
};
