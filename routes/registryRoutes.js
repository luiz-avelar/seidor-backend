const { Router } = require('express');
const { registryController } = require('../controllers');
const middlewares = require('../middlewares');

const registry = Router();

registry.post('/', middlewares.validateRegistryInfo, registryController.registryPost);

registry.put('/:id', middlewares.validateUpdateRegistry, registryController.registryPut);

registry.get('/', registryController.registryGet);

module.exports = registry;
