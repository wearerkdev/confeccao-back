const {Router} = require('express')

const auxiliaryRouter = Router()
const auxiliaryController = require('../controllers/auxiliary.controller')

auxiliaryRouter.get('/', async (request, response, next) => {
    next()
    return response.json({
        message: 'Home'
    })
})

auxiliaryRouter.get('/health', auxiliaryController.appHealth)

module.exports = auxiliaryRouter