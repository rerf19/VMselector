const awsIdb = require('../model/model_aws');

const mongoose = require('mongoose');

//find
exports.find = async (req,res) => {

    //QUERIES
    //region = east US
    //instances
    instances = await awsIdb.find().catch(err => {res.status(500).send({ message : err.message || "Error occurred while retriving instances information" }) });

    //v cpu
    Cpus = await awsIdb.distinct('VCpuInfo.DefaultVCpus')
    //ram
    Ram = await awsIdb.distinct('MemoryInfo.SizeInMiB')
    //cpu arch
    CpuArch = await awsIdb.distinct('ProcessorInfo.SupportedArchitectures.0')
    //cores
    Cores = await awsIdb.distinct('VCpuInfo.DefaultCores')
    //net int
    NetInt = await awsIdb.distinct('MemoryInfo.SizeInMiB')

    //render
    res.send({instances,Cpus,Ram,CpuArch,Cores,NetInt});
}
