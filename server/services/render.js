//Libraries required for this document
const axios = require('axios'); //extract the necessary information from links

//Render the home page
exports.homeRoute = (req,res) => {
    res.render('index');
}

//Render the Azure Search Page
exports.azure = async (req,res) => {
    //make a request to /api/azureI_DB
    axios.get('http://localhost:3000/api/az', {
        //send all the params to the back-end
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
            //send all the necessary information to ejs
            azR: response.data.regions,
            azI: response.data.instances,
            azCPU: response.data.vcpus.Cpus,
            azRam: response.data.ram.Ram,
            azCpuArch : response.data.cpuArch.CpuArch,
            azCore : response.data.core.Core,
            azNetInt: response.data.netInt.NetInt
        });
    })
    .catch(err => {
        res.send(err);
    })
}

//Render the AWS Search Page
exports.aws = async (req,res) => {

    axios.get('http://localhost:3000/api/aws',{
        params:
        {
            //send all the params to the back-end
            cpu: req.query.vCPUs,
            ram: req.query.ram,
            cpuArch: req.query.cpuArch,
            cpuPerCore: req.query.cpuPerCore,
            netInter: req.query.netInter
        }
    }).then(function(response){
        res.render('aws', {
            //send all the necessary information to ejs
            awsI: response.data.instances,
            awsCpu: response.data.Cpus,
            awsCores: response.data.Cores,
            awsRam: response.data.Ram,
            awsCpuArch: response.data.CpuArch,
            awsNetInt: response.data.NetInt
        })
    });
}

//render the all providers
exports.providers = async (req,res) => {
    const [az, aws] = await Promise.all([
        axios.get(`http://localhost:3000/api/az`,{
            //send all the params to the back-end
            params:
            {
                region: 'eastus',
                family: '',
                cpu : req.query.vCPUs,
                ram: req.query.ram,
                cpuArch: req.query.cpuArch,
                cpuPerCore: req.query.cpuPerCore,
                netInter: req.query.netInter,
                providers : 1
            }
        })
        .then(function(response){
            azI = response.data.instances,
            azCPU = response.data.vcpus.Cpus,
            azRam = response.data.ram.Ram,
            azCpuArch = response.data.cpuArch.CpuArch,
            azCore = response.data.core.Core,
            azNetInt = response.data.netInt.NetInt
        }),
        axios.get(`http://localhost:3000/api/aws`,{
            //send all the params to the back-end
            params:
            {
                cpu : req.query.vCPUs,
                ram: req.query.ram,
                cpuArch: req.query.cpuArch,
                cpuPerCore: req.query.cpuPerCore,
                netInter: req.query.netInter
            }
        })
        .then(function(response){
            //send all the necessary information to ejs
            awsI = response.data.instances,
            awsCpu = response.data.Cpus,
            awsCores = response.data.Cores,
            awsRam = response.data.Ram,
            awsCpuArch = response.data.CpuArch,
            awsNetInt = response.data.NetInt
            
        })
    ]);
    
    pI = Object.assign({}, azI, awsI)
    pCPU = Object.assign({}, azCPU, awsCpu);
    pCpuArch = Object.assign({}, azCpuArch, awsCpuArch);
    pNetInt = Object.assign({}, azNetInt, awsNetInt);
    pCore = Object.assign({}, azCore, awsCores);
    res.render('allProviders' , {
        prI : pI,
        prCPU : pCPU,
        prNetInt : pNetInt,
        prCpuArch : pCpuArch,
        prCore : pCore
    } )
}

//Render the Generate Azure Page
exports.generate_az = async (req,res) => {

    //request the information from the especific link
    axios.get('http://localhost:3000/api/az1', { params : { id : req.query.id }})
    .then(function(response){
        res.render('generateAZ', {
            //send all the infomatoin to ejs
            vm : response.data
        })
        
    })
    
}

//Render the Generate AWS Page
exports.generate_aws = async (req,res) => {

    //request the information from the especific link
    axios.get('http://localhost:3000/api/aws1', { params : { id : req.query.id }})
    .then(function(response){
        res.render('generateAWS', {
            //send all the infomatoin to ejs
            vm : response.data
        })
        
    })
    
}