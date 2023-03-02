const express = require('express');
const route = express.Router();

const services = require('../services/render');
var controller_az = require('../controller/controller_az');
var controller_aws = require('../controller/controller_aws');

//Website routes
route.get('/', services.homeRoute);
route.get('/azure', services.azure);
route.get('/aws',services.aws);
route.get('/generate-aws',services.generate_aws)

//API
//azure
route.get('/api/az',controller_az.find);
//aws
route.get('/api/aws',controller_aws.find);
module.exports = route;