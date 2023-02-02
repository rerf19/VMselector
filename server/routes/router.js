const express = require('express');
const route = express.Router();

const services = require('../services/render');
var controller_az = require('../controller/controller_az');

//Website routes
route.get('/', services.homeRoute);
route.get('/azure', services.azure);

//API
route.get('/api/az',controller_az.find);
module.exports = route;