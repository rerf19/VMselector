//Model that connects to the right collection
const awsIdb = require('../model/model_aws');

//Libraries required for this document
const mongoose = require('mongoose'); //to search on the database

//Function that finds all the requested VMs, depending on the specifications
exports.find = async (req,res) => {

    //variables from the user
    const _cpu = req.query.cpu 
    const _ram = req.query.ram 
    const _cpuArch = req.query.cpuArch 
    const _cpuPerCore = req.query.cpuPerCore 
    const _netInter = req.query.netInter 

    //QUERIES
    //region = east US
    //instances
    let query = {};

    if(_cpu){
        Object.assign(query, {'VCpuInfo.DefaultVCpus':  parseInt(_cpu)});
    }
    if(_ram){
        Object.assign(query, {'MemoryInfo.SizeInMiB':  parseInt(_ram)});
    }
    if(_cpuArch){
        Object.assign(query, {'ProcessorInfo.SupportedArchitectures.0': _cpuArch});
    }
    if(_cpuPerCore){
        Object.assign(query, {'VCpuInfo.DefaultCores': parseInt(_cpuPerCore)});
    }
    if(_netInter){
        Object.assign(query, {'NetworkInfo.MaximumNetworkInterfaces':  parseInt(_netInter)});
    }
    
    instances = await awsIdb.find(query).sort({ 'VCpuInfo.DefaultVCpus': 1 }).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving instances information" }) });
    

    //v cpu
    Cpus = await awsIdb.distinct('VCpuInfo.DefaultVCpus')
    //ram
    Ram = await awsIdb.distinct('MemoryInfo.SizeInMiB')
    //cpu arch
    CpuArch = await awsIdb.distinct('ProcessorInfo.SupportedArchitectures.0')
    //cores
    Cores = await awsIdb.distinct('VCpuInfo.DefaultCores')
    //net int
    NetInt = await awsIdb.distinct('NetworkInfo.MaximumNetworkInterfaces')

    //render
    res.send({instances,Cpus,Ram,CpuArch,Cores,NetInt});
}

//Function that return all the data from one document
exports.findOne = async (req,res) => {

    const id = req.query.id
    info = await awsIdb.findById(id)
    res.send(info)
    
}
