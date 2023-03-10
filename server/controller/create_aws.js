const axios = require('axios');
const fs = require('fs');
const { exec } = require("child_process");

const { TerraformGenerator, Resource, map, fn } = require('terraform-generator');

const tfg = new TerraformGenerator();

tfg.provider('aws', {
    region: 'us-east-1'
});


//create the virtual machine
exports.create = async (req,res) => {

    axios.get('http://localhost:3000/api/aws1', { params : { id : req.query.id }})
    .then(function(response){

        const instanceName = 'instance';
        const instanceType = response.data.InstanceType;
        const amiId = 'ami-0fd2c44049dd805b8'; // Amazon Linux 2 AMI

        tfg.resource('aws_instance', instanceName, {
            ami: amiId,
            instance_type: instanceType,
        });

        tfg.generate();
        tfg.write({
            dir: 'tf/AWS',
            format: true
        });

        console.log("WAIT FOR THE 'Terraform Apply' ...");

        exec("terraform init",{ cwd: "./tf/AWS" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
          
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        exec("terraform plan",{ cwd: "./tf/AWS" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
          
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        res.redirect('/aws');
    })
}