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
    const family = req.query.family || ''

    //ESPECIFIC
    //vCPUs
    //const _vCPUs = req.query.vCPUs || 1000
    //MemoryGB
    //const _memoryGB = req.query.MemoryGB || 11400

    //QUERIES
    //region
    regions = await azIdb.distinct('locationInfo.location', {'resourceType': 'virtualMachines'}).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving region information" }) });
    //instances
    instances = await azIdb.find({
        'locationInfo.location': region,
        'family': { $regex: '.*' + family + '.*'},
        //'capabilities.vCPUs': { $lte :  vCPUs},
        //'capabilities.MemoryGB': { $lte :  "4" },
        'resourceType': 'virtualMachines'
    }).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving instances information" }) });

    //return
    res.send({regions,instances})
}

//update
//export.update

//delete
//export.delete 