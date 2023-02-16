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
            family: req.query.family
        }
    })
    .then(function(response){
        res.render('azure',{
            azR: response.data.regions,
            azI: response.data.instances,
        });
    })
    .catch(err => {
        res.send(err);
    })
}