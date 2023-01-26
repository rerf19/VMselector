const express = require('express');
const route = express.Router();

const services = require('../services/render')

route.get('/', services.homeRoute);
route.get('/azure', services.azure);

module.exports = route;