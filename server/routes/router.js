const express = require('express');
const route = express.Router();

const services = require('../services/render');
var controller_az = require('../controller/controller_az');

//Website routes
route.get('/', services.homeRoute);
route.get('/azure', services.azure);
route.get('/aws',services.aws);

//API
//azure
route.get('/api/az',controller_az.find);
//aws
module.exports = route;