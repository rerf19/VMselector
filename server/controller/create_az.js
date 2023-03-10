const axios = require('axios');
const fs = require('fs');
const { exec } = require("child_process");

const { TerraformGenerator, Resource, map, fn } = require('terraform-generator');

const tfg = new TerraformGenerator();

exports.create = async (req,res) => {

    axios.get('http://localhost:3000/api/az1', { params : { id : req.query.id }})
    .then(function(response){
        
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

        tfg.generate();
        tfg.write({
            dir: 'tf/Azure',
            format: true
        });

        console.log("WAIT FOR THE 'Terraform Apply' ...");

        exec("terraform init",{ cwd: "./tf/Azure" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
          
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        exec("terraform plan",{ cwd: "./tf/Azure" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
          
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        res.redirect('/azure');
    })
}