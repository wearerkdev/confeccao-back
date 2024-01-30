const { Router } = require('express');
const segmentController = require('../controllers/segment.controller');

const segmentRouter = Router();

segmentRouter.post('/novo', segmentController.addNewSegment);
segmentRouter.get('/encontrarpor/:id', segmentController.findSegmentByID);
segmentRouter.get('/encontrartodos/', segmentController.findAllSegments);

module.exports = segmentRouter;
