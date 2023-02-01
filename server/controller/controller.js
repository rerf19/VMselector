const azIdb = require('../model/model');

//Create
//export.create = (req,res) => {
//}

//get all the the intances infomation
exports.find = (req,res) => {
    azIdb.find()
    .then(info => {
        console.log(1);
        res.send(info)
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
    })
}

//update
//export.update

//delete
//export.delete 