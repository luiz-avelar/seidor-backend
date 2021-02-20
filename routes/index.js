const express = require('express');
const carsRoutes = require('./carsRoutes');
const driversRoutes = require('./driversRoutes');
const registryRoutes = require('./registryRoutes');

const routes = express();

routes.use('/cars', carsRoutes);
routes.use('/drivers', driversRoutes);
routes.use('/registry', registryRoutes);

module.exports = routes;
