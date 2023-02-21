const azIdb = require('../model/model_az_I');
const azRdb = require('../model/model_az_R');

const mongoose = require('mongoose');
//Create
//export.createVM = (req,res) => {
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
    const _vCPUs = req.query.cpu || '9999'
    //MemoryGB
    const _memoryGB = req.query.ram || '9999'
    console.log(typeof(_vCPUs))
    console.log(typeof(_memoryGB))
    //QUERIES
    //region
    regions = await azIdb.distinct('locationInfo.location', {'resourceType': 'virtualMachines'}).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving region information" }) });
    //instances
    instances = await azIdb.find({
        'locationInfo.location': region,
        'family': { $regex: '.*' + family + '.*'},
        'capabilities.2.value': _vCPUs,
        'capabilities.5.value': _memoryGB,
        'resourceType': 'virtualMachines'
    }).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving instances information" }) });

    //cpu
    cpus = await azIdb.distinct('capabilities.2.value', {'resourceType': 'virtualMachines'})
    const vcpus = {cpus};
    vcpus.cpus.sort(function(a, b) {
        return a - b;
    });

    //ram
    Ram = await azIdb.distinct('capabilities.5.value', {'resourceType': 'virtualMachines'})
    const ram = {Ram};
    ram.Ram.sort(function(a, b) {
        return a - b;
    });

    //hard drive
    hard_drive = await azIdb.distinct('capabilities.5.value', {'resourceType': 'virtualMachines'})
    const hardDrive = {hard_drive};
    hardDrive.hard_drive.sort(function(a, b) {
        return a - b;
    });

    //cpu architecture
    cpu_arc = await azIdb.distinct('capabilities.5.value', {'resourceType': 'virtualMachines'})
    const cpuArc = {cpu_arc};
    cpuArc.cpu_arc.sort(function(a, b) {
        return a - b;
    });
    
    //return
    res.send({regions,instances,vcpus,ram})
}

//update
//export.update

//delete
//export.delete 