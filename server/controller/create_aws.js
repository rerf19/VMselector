const axios = require('axios');
const fs = require('fs');

const { TerraformGenerator, Resource, map, fn } = require('terraform-generator');

const tfg = new TerraformGenerator({
    required_version: '4.54'
});

tfg.provider('aws', {
    region: 'us-east-1'
});


//create the virtual machine
exports.create = async (req,res) => {

    axios.get('http://localhost:3000/api/aws1', { params : { id : req.query.id }})
    .then(function(response){

        const instanceName = 'instance';
        const instanceType = response.data.InstanceType;
        const amiId = 'ami-0c55b159cbfafe1f0'; // Amazon Linux 2 AMI

        tfg.resource('aws_instance', instanceName, {
            ami: amiId,
            instance_type: instanceType,
        });

        tfg.generate();
        tfg.write({
            dir: 'tf',
            format: true
          });

        res.redirect('/aws');
    })
}