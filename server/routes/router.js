const express = require('express');
const route = express.Router();

const render = require('../services/render');
const controller_az = require('../controller/controller_az');
const controller_aws = require('../controller/controller_aws');
const create_aws = require('../controller/create_aws');
const create_az = require('../controller/create_az');

//Website routes
route.get('/', render.homeRoute);
route.get('/azure', render.azure);
route.get('/aws', render.aws);
route.get('/generate-aws', render.generate_aws);
route.get('/generate-az', render.generate_az);

route.get('/create-aws', create_aws.create);
route.get('/create-az', create_aws.create);

//API
//azure
route.get('/api/az', controller_az.find);
route.get('/api/az1', controller_az.findOne);
//aws
route.get('/api/aws', controller_aws.find);
route.get('/api/aws1', controller_aws.findOne);

module.exports = route;