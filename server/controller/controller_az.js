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
    

    //instances
    instances = await azIdb.find({
        'locationInfo.location' : { $regex: '.*' + _region},
        'family' : { $regex: '.*' + _family + '.*'},
        capabilities: {
            $elemMatch: {
                'name': 'vCPUs',
                'value': { $regex: '.*' + _vCPUs }
            }
        },
        capabilities: {
            $elemMatch: {
                'name': 'MemoryGB',
                'value': { $regex: '.*' + _memoryGB }
            }
        },
        capabilities: {
            $elemMatch: {
                'name': 'CpuArchitectureType',
                'value': { $regex: '.*' + _cpuArch }
            }
        },
        capabilities: {
            $elemMatch: {
                'name': 'vCPUsPerCore',
                'value': { $regex: '.*' + _cpuPerCore }
            }
        },
        capabilities: {
           $elemMatch: {
               'name': 'MaxNetworkInterfaces',
               'value': { $regex: '.*' + _netInter }
           }
        },
        'resourceType': 'virtualMachines'
    }).sort({ 'capabilities.value': 1 }).catch(err => {
        res.status(500).send({ message : err.message || "Error occurred while retrieving instances information" });
    });

    //find cpu
    Cpus = await azIdb.distinct('capabilities.2.value', {
        'resourceType': 'virtualMachines',
        'capabilities.2.name': 'vCPUs'
    })
    const vcpus = {Cpus};
    vcpus.Cpus.sort(function(a, b) {
        return a - b;
    });

    //find ram
    Ram = await azIdb.distinct('capabilities.5.value', {
        'resourceType': 'virtualMachines',
        'capabilities.5.name': 'MemoryGB'
    })
    const ram = {Ram};
    ram.Ram.sort(function(a, b) {
        return a - b;
    });

    //find CpuArch
    CpuArch = await azIdb.distinct('capabilities.7.value', {
        'resourceType': 'virtualMachines',
        'capabilities.7.name': 'CpuArchitectureType'
    })
    const cpuArch = {CpuArch};
    cpuArch.CpuArch.sort(function(a, b) {
        return a - b;
    });

    //find Core
    Core = await azIdb.distinct('capabilities.13.value', {
        'resourceType': 'virtualMachines',
        'capabilities.13.name': 'vCPUsPerCore'
    })
    const core = {Core};
    core.Core.sort(function(a, b) {
        return a - b;
    });

    //find max network interface
    NetInt = await azIdb.distinct('capabilities.24.value', {
        'resourceType': 'virtualMachines',
        'capabilities.24.name': 'MaxNetworkInterfaces'
    })
    const netInt = {NetInt};
    netInt.NetInt.sort(function(a, b) {
        return a - b;
    });

    //return all the necessary data to the front-end
    res.send({regions,instances,vcpus,ram,cpuArch,core,netInt})
}

//Function that return all the data from one document
exports.findOne = async (req,res) => {

    const id = req.query.id
    info = await azIdb.findById(id)
    res.send(info)
    
}