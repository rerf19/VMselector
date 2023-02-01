const axios = require('axios');

exports.homeRoute = (req,res) => {
    
    res.render('index');
}

exports.azure = (req,res) => {
    //make a request to /api/azureI_DB
    axios.get('http://localhost:3000/api/az')
    .then(function(response){
        res.render('azure',{azR: response.data});
    })
    .catch(err => {
        res.send(err);
    })
}