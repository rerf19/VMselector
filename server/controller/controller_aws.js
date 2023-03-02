const awsIdb = require('../model/model_aws');

const mongoose = require('mongoose');

//find
exports.find = async (req,res) => {

    //REQ
    console.log(req.query)
    const _cpu = req.query.cpu || 0
    const _ram = req.query.ram || 0
    const _cpuArch = req.query.cpuArch || ''
    const _cpuPerCore = req.query.cpuPerCore || 0
    const _netInter = req.query.netInter || 0

    //QUERIES
    //region = east US
    //instances
    if(_cpu == 0 && _ram == 0 && _cpuArch == '' && _cpuPerCore == 0 && _netInter == 0){
        instances = {};
    } else {
        instances = await awsIdb.find({
            'VCpuInfo.DefaultVCpus': { $gte: parseInt(_cpu)} ,
            'MemoryInfo.SizeInMiB': { $gte: parseInt(_ram) },
            'ProcessorInfo.SupportedArchitectures.0': { $regex: '.*' + _cpuArch},
            'VCpuInfo.DefaultCores': { $gte: parseInt(_cpuPerCore) },
            'NetworkInfo.MaximumNetworkInterfaces': { $gte: parseInt(_netInter) }
        }).sort({ 'VCpuInfo.DefaultVCpus': 1 }).catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving instances information" }) });
    }

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

exports.findOne = async (req,res) => {

}
