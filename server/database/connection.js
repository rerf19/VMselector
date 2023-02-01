const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        //mongoDB conn string
        mongoose.set('strictQuery', false); //to not show up the warming message
        const conn = await mongoose.connect(process.env.MongoDB_con, {useNewUrlParser: true});

        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}

const db = mongoose.connection
db.once("open", () => console.log("Database Connected"));

module.exports = connectDB;