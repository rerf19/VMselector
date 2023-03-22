//Libraries required for this document
const axios = require('axios'); //extract the necessary information from links
const { exec } = require("child_process"); //to able to execute cmd commands
const { TerraformGenerator, Resource, map, fn } = require('terraform-generator'); //tranform and generate terraform code

const tfg = new TerraformGenerator(); //open the terraform generator

//Tranform and generate the necessary terraform code the create a virtual machine
exports.create = async (req,res) => {
    //get all the vm information
    axios.get('http://localhost:3000/api/az1', { params : { id : req.query.id }})
    .then(function(response){
        
        //create the VM resource 
        tfg.resource('azurerm_virtual_machine', 'example-vm', {
            name: response.data.name,
            location: response.data.locations,
            vm_size: response.data.size,
            storage_image_reference: {
              publisher: 'Canonical',
              offer: 'UbuntuServer',
              sku: '18.04-LTS',
              version: 'latest'
            },

        });

        //generate the terraform code
        tfg.generate();

        //create/edit terraform document with the update information
        tfg.write({
            dir: 'tf/Azure',
            format: true
        });

        
        //execute 'terraform init' to download the necessary files
        exec("terraform init",{ cwd: "./tf/Azure" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
          
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        //execute 'terraform plan' for the user be able to make sure everything is right
        exec("terraform plan",{ cwd: "./tf/Azure" }, (error, stdout, stderr) => {
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
        res.redirect('/azure');
    })
}

//executes and show the terraform plan
exports.plan = async (req,res) => {

  exec("terraform plan -no-color > tfplan.txt && tfplan.txt",{ cwd: "./tf/Azure" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
  });

  res.redirect('/executeAZ')
}

//executes the terraform apply
exports.apply = async (req,res) => {

  exec("terraform apply -auto-approve",{ cwd: "./tf/Azure" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
  });

  res.redirect('/azure')
}