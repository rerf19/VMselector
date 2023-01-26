const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const azureInDB = mongoose.model('azI_DB',schema);

module.exports = azureInDB;