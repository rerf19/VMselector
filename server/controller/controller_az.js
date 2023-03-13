//Model that connects to the right collection
const azIdb = require('../model/model_az');

//Libraries required for this document
const mongoose = require('mongoose'); //to search on the database

//Function that finds all the requested VMs, depending on the specifications
exports.find = async (req,res) => {

    //variables from the user
    const _region = req.query.region
    const _family = req.query.family || ''
    const _vCPUs = req.query.cpu || ''
    const _memoryGB = req.query.ram || ''
    const _cpuArch = req.query.cpuArch || ''
    const _cpuPerCore = req.query.cpuPerCore || ''
    const _netInter = req.query.netInter || ''

    //QUERIES
    //find region
    regions = await azIdb.distinct('locationInfo.location', {'resourceType': 'virtualMachines'}).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving region information" }) });
    //find instances
    instances = await azIdb.find({
        'locationInfo.location': { $regex: '.*' + _region},
        'family': { $regex: '.*' + _family + '.*'},
        'capabilities.2.value': { $regex:  _vCPUs + '.*'},
        'capabilities.5.value': { $regex: '.*' + _memoryGB},
        'capabilities.7.value': { $regex: '.*' + _cpuArch},
        'capabilities.13.value': { $regex: '.*' + _cpuPerCore},
        //'capabilities.23.value': { $regex: '.*' + _netInter},
        'resourceType': 'virtualMachines'
    }).sort({ 'capabilities.2.value': 1 }).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving instances information" }) });

    //find cpu
    Cpus = await azIdb.distinct('capabilities.2.value', {'resourceType': 'virtualMachines'})
    const vcpus = {Cpus};
    vcpus.Cpus.sort(function(a, b) {
        return a - b;
    });

    //find ram
    Ram = await azIdb.distinct('capabilities.5.value', {'resourceType': 'virtualMachines'})
    const ram = {Ram};
    ram.Ram.sort(function(a, b) {
        return a - b;
    });

    //return all the necessary data to the front-end
    res.send({regions,instances,vcpus,ram})
}

//Function that return all the data from one document
exports.findOne = async (req,res) => {

    const id = req.query.id
    info = await azIdb.findById(id)
    res.send(info)
    
}