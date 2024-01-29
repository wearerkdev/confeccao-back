const express = require('express')
const routes = express.Router()

const auxiliaryRouter = require('./auxiliary.routes')

// Aux routes
routes.get('/health', auxiliaryRouter)


// Exporting routes
module.exports = routes