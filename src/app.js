const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const morgan = require('morgan');
const colors = require('colors');

const app = express();
colors.enable();
app.use(cors({ credentials: true, origin: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use('/', routes);

module.exports = app;
