const azIdb = require('../model/model_az_I');
const azRdb = require('../model/model_az_R');

const mongoose = require('mongoose');
//Create
//export.create = (req,res) => {
//}

//get all the the intances infomation
exports.find = async (req,res) => {
    //GENERAL
    //region
    const region = req.query.region || 'eastus';
    //family
    const family = req.query.family || 'standardA'

    //ESPECIFIC
    //vCPUs
    const vCPUs = req.query.vCPUs || 1000
    //MemoryGB
    const memory = req.query.MemoryGB || 999999

    //QUERIES
    //region
    regions = await azRdb.find({}).catch(err => {res.status(500).send({ message : err.message || "Error Occurred while retriving region information" }) });
    //instances
    instances = await azIdb.find({
        'locationInfo.location': region,
        'family': { $regex: '.*' + family + '.*'},
        //'capabilities.vCPUs': { $lte :  vCPUs},
        //'capabilities.MemoryGB': { $lte :  "4" },
        'resourceType': 'virtualMachines'
    }).catch(err => {res.status(500).send({ message : err.message || "Error Occurred while retriving region information" }) });
    //CPUs
    cpus = await azIdb.find({

    }).catch(err => {res.status(500).send({ message : err.message || "Error Occurred while retriving region information" }) });
    //memory
    memory = await azIdb.find({

    }).catch(err => {res.status(500).send({ message : err.message || "Error Occurred while retriving region information" }) });
    res.send({regions,instances,/*cpus,memory*/})
}

//update
//export.update

//delete
//export.delete 