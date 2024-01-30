const express = require('express');
const routes = express.Router();

const auxiliaryRouter = require('./auxiliary.routes');
const factoryRouter = require('./factory.routes');

// Aux routes
routes.get('/health', auxiliaryRouter);
routes.get('/', async (request, response, next) => {
  next();
  return response.json({
    message: 'Home',
  });
});

// Confeccao
routes.use('/factory', factoryRouter);

// Exporting routes
module.exports = routes;
