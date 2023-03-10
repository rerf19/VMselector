const axios = require('axios');

exports.create = async (req,res) => {

    axios.get('http://localhost:3000/api/az1', { params : { id : req.query.id }})
    .then(function(response){


    })
}