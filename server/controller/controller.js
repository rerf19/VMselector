const azIdb = require('../model/model_az_I');
const azRdb = require('../model/model_az_R');
//Create
//export.create = (req,res) => {
//}

//get all the the intances infomation
exports.find = (req,res) => {
    azRdb.find().then(info => {
        res.send(info)
    }).catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
    })
}

//update
//export.update

//delete
//export.delete 