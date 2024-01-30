const { Router } = require('express');
const segmentController = require('../controllers/segment.controller');

const segmentRouter = Router();

segmentRouter.post('/novo', segmentController.addNewSegment);

module.exports = segmentRouter;
