//Libraries required for this document
const express = require('express'); //express

//All the documments necessary to render all the infomartion
const route = express.Router(); //call the express route method
const render = require('../services/render'); //to link the routes with the pages
const controller_az = require('../controller/controller_az'); //functiond to search azure information
const controller_aws = require('../controller/controller_aws'); //functiond to search aws information
const create_aws = require('../controller/create_aws'); //functiond to create the azure VM
const create_az = require('../controller/create_az'); //functiond to create the azure Azure


//Website routes
route.get('/', render.homeRoute);

    //search pages
route.get('/azure', render.azure);
route.get('/aws', render.aws);
route.get('/providers', render.providers);

    //generate and create
route.get('/generate-az', render.generate_az);
route.get('/generate-aws', render.generate_aws);
route.get('/create-az', create_az.create);
route.get('/create-aws', create_aws.create);


//API
//Azure API
route.get('/api/az', controller_az.find); //return the azure info
route.get('/api/az1', controller_az.findOne); //return only one azure machine
//AWS API
route.get('/api/aws', controller_aws.find); //return the azure info
route.get('/api/aws1', controller_aws.findOne); //return only one aws machine

module.exports = route;