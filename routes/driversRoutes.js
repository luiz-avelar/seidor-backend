const { Router } = require('express');
const { driversController } = require('../controllers');
const middlewares = require('../middlewares');

const drivers = Router();

drivers.post('/', middlewares.validateDriverName, driversController.driversPost);

drivers.put('/:id', middlewares.validateDriverName, driversController.driversPut);

drivers.delete('/:id', driversController.driversDelete);

drivers.get('/', driversController.driversGet);

drivers.get('/:id', driversController.driversGetWithParams);

module.exports = drivers;
