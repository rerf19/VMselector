//Libraries required for this document
const axios_call = require('axios'); //extract the necessary information from links
const axios = axios_call.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000",
});
const { exec } = require("child_process"); //to able to execute cmd commands
const { TerraformGenerator, Resource, map, fn } = require('terraform-generator'); //tranform and generate terraform code

const tfg = new TerraformGenerator(); //open the terraform generator

//Tranform and generate the necessary terraform code the create a virtual machine
exports.create = async (req,res) => {
    //get all the vm information
    axios.get('/api/az1', { params : { id : req.query.id }})
    .then(function(response){

        const location = response.data.locations

        //necessary resource group
        const rg = tfg.resource('azurerm_resource_group','rg_' + response.data.size,{
            name: 'rg_' + response.data.size + '_name',
            location: location[0].toLowerCase(),
        });

        //   
        // resource "azurerm_network_interface" "example" {
        //   name                = "example-nic"
        //   location            = azurerm_resource_group.example.location
        //   resource_group_name = azurerm_resource_group.example.name
        
        //   ip_configuration {
        //     name                          = "internal"
        //     subnet_id                     = azurerm_subnet.example.id
        //     private_ip_address_allocation = "Dynamic"
        //   }
        // }
        const vir_net = tfg.resource('azurerm_virtual_network','vir_'+ response.data.size, {
            name: 'vir_'+ response.data.size + '_name',
            resource_group_name: 'rg_' + response.data.size + '_name',
            location: location[0].toLowerCase(),
            address_space: ["10.0.0.0/16"]
        });

        const sub_net = tfg.resource('azurerm_subnet','sb_' + response.data.size,{
            name: 'sb_' + response.data.size + '_name',
            resource_group_name: 'rg_' + response.data.size + '_name',
            virtual_network_name: 'vir_'+ response.data.size + '_name',
            address_prefixes: ["10.0.3.0/24"]
        })

        const net_inter = tfg.resource('azurerm_network_interface','ni_' + response.data.size,{
            name: 'ni_' + response.data.size + '_name',
            location: location[0].toLowerCase(),
            resource_group_name: 'rg_' + response.data.size + '_name',
            ip_configuration: {
                name: "internal",
                subnet_id: sub_net.id,
                private_ip_address_allocation: "Dynamic"
            }
        });

        //create the VM resource 
        tfg.resource('azurerm_linux_virtual_machine', response.data.size, {
            name: 'virtiualMachine',
            location: location[0].toLowerCase(),
            size: response.data.name,
            resource_group_name: 'rg_' + response.data.size + '_name',
            network_interface_ids: [net_inter.id],
            disable_password_authentication: false,
            admin_username: 'secret_admin',
            admin_password: 'secret_password@123',
            os_disk: {
                caching: "ReadWrite",
                storage_account_type: "Standard_LRS"
            },
            source_image_reference: {
                publisher: 'Canonical',
                offer: 'UbuntuServer',
                sku: '18.04-LTS',
                version: 'latest'
            },
        });

        //generate the terraform code
        code =  tfg.generate();

        //redirect to the AWS Search page
        res.redirect('/code?info=${code}');
    })
}

