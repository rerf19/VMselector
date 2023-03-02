const axios = require('axios');

exports.homeRoute = (req,res) => {
    res.render('index');
}

exports.azure = async (req,res) => {
    //make a request to /api/azureI_DB
    axios.get('http://localhost:3000/api/az', {
        params:
        {
            region: req.query.region,
            family: req.query.family,
            cpu : req.query.vCPUs,
            ram: req.query.ram,
            cpuArch: req.query.cpuArch,
            cpuPerCore: req.query.cpuPerCore,
            netInter: req.query.netInter
        }
    })
    .then(function(response){
        res.render('azure',{
            azR: response.data.regions,
            azI: response.data.instances,
            azCPU: response.data.vcpus.Cpus,
            azRam: response.data.ram.Ram
            //azCpuArch: response.data.cpuArch,
            //azCpuPerCore: response.data.cpuPerCore.CPU_Per_Core,
            //azNetInter: response.data.netInter.Net_Inter
        });
    })
    .catch(err => {
        res.send(err);
    })
}

exports.aws = async (req,res) => {

    axios.get('http://localhost:3000/api/aws',{
        params:
        {
            cpu: req.query.vCPUs,
            ram: req.query.ram,
            cpuArch: req.query.cpuArch,
            cpuPerCore: req.query.cpuPerCore,
            netInter: req.query.netInter
        }
    }).then(function(response){
        res.render('aws', {
            awsI: response.data.instances,
            awsCpu: response.data.Cpus,
            awsCores: response.data.Cores,
            awsRam: response.data.Ram,
            awsCpuArch: response.data.CpuArch,
            awsNetInt: response.data.NetInt
        })
    });
}

exports.generate_aws = async (req,res) => {

    axios.get('http://localhost:3000/api/aws', { params : { id : req.query.id }})
    .then(function(response){
        res.render('generatorAWS', {
            insInfo : response.data
        })
        
    })
    
}