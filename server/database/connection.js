const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        //mongoDB conn string
        console.log(1)
        const conn = await mongoose.connect(process.env.MongoDB_con);
        
        console.log(`MongoDB connected: ${con.connection.host}`)
        
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;