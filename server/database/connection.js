const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        //mongoDB conn string
        mongoose.set('strictQuery', false); //to not show up the warming message
        const conn = await mongoose.connect(process.env.MongoDB_con);

        
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;