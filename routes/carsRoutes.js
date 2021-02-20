const { Router } = require('express');
const { carsController } = require('../controllers');
const middlewares = require('../middlewares');

const cars = Router();

cars.post('/', middlewares.validateCreateCarInfo, carsController.carsPost);

cars.put('/:plate', carsController.carsPut);

cars.delete('/:plate', carsController.carsDelete);

cars.get('/', carsController.carsGet);

cars.get('/:plate', carsController.carsGetWithParams);

module.exports = cars;
