const express = require('express');
const routes = express.Router();

const auxiliaryRouter = require('./auxiliary.routes');
const factoryRouter = require('./factory.routes');
const segmentRouter = require('./segment.routes');
const orderRouter = require('./order.routes');

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

// Segmento
routes.use('/segmento', segmentRouter);

// Pedidos
routes.use('/order', orderRouter);

// Exporting routes
module.exports = routes;
