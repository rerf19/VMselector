//Libraries required for this document
const axios = require('axios'); //extract the necessary information from links
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
    axios.get('http://localhost:3000/api/aws1', { params : { id : req.query.id }})
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
        tfg.generate();

        //create/edit terraform document with the update information
        tfg.write({
            dir: 'tf/AWS',
            format: true
        });

        

        //execute 'terraform init' to download the necessary files
        exec("terraform init",{ cwd: "./tf/AWS" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
          
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        //execute 'terraform plan' for the user be able to make sure everything is right
        exec("terraform plan",{ cwd: "./tf/AWS" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
          
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        //update the user that the command have been apllied
        console.log("WAIT FOR THE 'Terraform Apply' ...");

        //redirect to the AWS Search page
        res.redirect('/aws');
    })
}