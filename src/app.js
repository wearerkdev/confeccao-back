const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('./routes')

const app = express()
app.use(cors({credentials: true, origin: true}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routes)

module.exports = app