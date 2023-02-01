const express = require('express');
const route = express.Router();

const services = require('../services/render');
var controller = require('../controller/controller');

//Website routes
route.get('/', services.homeRoute);
route.get('/azure', services.azure);

//API
route.get('/api/azIdb',controller.find);

module.exports = route;