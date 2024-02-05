const { Router } = require('express');
const orderController = require('../controllers/order.controller');

const orderRouter = Router();

orderRouter.post('/novo', orderController.addNewOrder);
// orderRouter.get('/encontrarpor/:id', orderController.findorderByID);
// orderRouter.get('/encontrartodos/', orderController.findPerStatus);
// orderRouter.get('/encontrar/', orderController.findPerStatus);
// orderRouter.get('/status/', orderRouter.findPerStatus);
orderRouter.get('/encontrartodos', orderController.findAllOrders);

module.exports = orderRouter;
