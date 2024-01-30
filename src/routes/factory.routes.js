const { Router } = require('express');
const factoryController = require('../controllers/factory.controller');

const factoryRouter = Router();

factoryRouter.post('/', factoryController.addNewFactory);
factoryRouter.get('/:id', factoryController.findFactoryByID);
factoryRouter.get('/', factoryController.findAllFactories);

module.exports = factoryRouter;
