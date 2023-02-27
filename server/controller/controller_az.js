const azIdb = require('../model/model_az');

const mongoose = require('mongoose');
//Create
//export.createVM = (req,res) => {
//}

//get all the the intances infomation
exports.find = async (req,res) => {
    //REQUEST
    //region
    const _region = req.query.region
    //family
    const _family = req.query.family || ''
    //vCPUs
    const _vCPUs = req.query.cpu || ''
    //MemoryGB
    const _memoryGB = req.query.ram || ''
    //cpu architecture
    const _cpuArch = req.query.cpuArch || ''
    //cpu per core
    const _cpuPerCore = req.query.cpuPerCore || ''
    //network interfaces
    const _netInter = req.query.netInter || ''

    //QUERIES
    //region
    regions = await azIdb.distinct('locationInfo.location', {'resourceType': 'virtualMachines'}).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving region information" }) });
    //instances
    instances = await azIdb.find({
        'locationInfo.location': { $regex: '.*' + _region},
        'family': { $regex: '.*' + _family + '.*'},
        'capabilities.2.value': { $regex: '.*' + _vCPUs},
        'capabilities.5.value': { $regex: '.*' + _memoryGB},
        'capabilities.7.value': { $regex: '.*' + _cpuArch},
        'capabilities.13.value': { $regex: '.*' + _cpuPerCore},
        'capabilities.23.value': { $regex: '.*' + _netInter},
        'resourceType': 'virtualMachines'
    }).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving instances information" }) });

    //cpu
    Cpus = await azIdb.distinct('capabilities.2.value', {'resourceType': 'virtualMachines'})
    const vcpus = {Cpus};
    vcpus.Cpus.sort(function(a, b) {
        return a - b;
    });

    //ram
    Ram = await azIdb.distinct('capabilities.5.value', {'resourceType': 'virtualMachines'})
    const ram = {Ram};
    ram.Ram.sort(function(a, b) {
        return a - b;
    });

    //cpu architecture
    // cpuArch = await azIdb.distinct('capabilities.7.value', {'resourceType': 'virtualMachines'})

    //vcpu Per Core
    // CPU_Per_Core = await azIdb.distinct('capabilities.13.value', {'resourceType': 'virtualMachines'})
    // const cpuPerCore = {CPU_Per_Core};
    // cpuPerCore.CPU_Per_Core.sort(function(a, b) {
    //     return a - b;
    // });

    //networks interface
    // Net_Inter = await azIdb.distinct('capabilities.23.value', {'resourceType': 'virtualMachines'})
    // const netInter = {Net_Inter};
    // netInter.Net_Inter.sort(function(a, b) {
    //     return a - b;
    // });

    //return regions,instances,vcpus,ram,
    res.send({regions,instances,vcpus,ram})
}

//update
//export.update

//delete
//export.delete 