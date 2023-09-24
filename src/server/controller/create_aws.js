//Libraries required for this document
const axios_call = require('axios'); //extract the necessary information from links
const axios = axios_call.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000",
});
const { exec } = require("child_process"); //to able to execute cmd commands
const { TerraformGenerator, Resource, map, fn } = require('terraform-generator'); //tranform and generate terraform code

const tfg = new TerraformGenerator(); //open the terraform generator

//define the only provider
tfg.provider('aws', {
    region: 'us-east-1'
});


//Tranform and generate the necessary terraform code the create a virtual machine
exports.create = async (req,res) => {

    //get all the vm information
    axios.get('/api/aws1', { params : { id : req.query.id }})
    .then(function(response){
        
        //variables
        const instanceName = 'instance';
        const instanceType = response.data.InstanceType;
        const amiId = 'ami-0fd2c44049dd805b8'; // Amazon Linux 2 AMI

        //create the VM resource 
        tfg.resource('aws_instance', instanceName, {
            ami: amiId,
            instance_type: instanceType,
        });

        //generate the terraform code
        code = tfg.generate()

        //redirect to the AWS Search page
        res.redirect('/code?info=${code}');
    })
}
