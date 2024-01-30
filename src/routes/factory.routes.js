const { Router } = require('express');
const factoryController = require('../controllers/confeccao.controller');

const factoryRouter = Router();

factoryRouter.post('/', factoryController.addNewFactory);

module.exports = factoryRouter;
