const express = require('express');
const routes = express.Router();

const auxiliaryRouter = require('./auxiliary.routes');

// Aux routes
routes.get('/health', auxiliaryRouter);
routes.get('/', async (request, response, next) => {
  next();
  return response.json({
    message: 'Home',
  });
});

// Exporting routes
module.exports = routes;
