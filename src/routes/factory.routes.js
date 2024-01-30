const { Router } = require('express');
const factoryController = require('../controllers/factory.controller');

const factoryRouter = Router();

factoryRouter.post('/nova', factoryController.addNewFactory);
factoryRouter.get('/encontrarpor/:id', factoryController.findFactoryByID);
factoryRouter.get('/todas', factoryController.findAllFactories);
factoryRouter.get('/status/', factoryController.findPerStatus);
factoryRouter.put('/atualizar/:id', factoryController.updateFactory);
factoryRouter.delete('/deletar/:id', factoryController.deleteOneFactory);

module.exports = factoryRouter;
