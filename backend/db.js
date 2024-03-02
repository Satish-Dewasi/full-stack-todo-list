require('dotenv').config();
const mongoose= require('mongoose');

MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL);

const db= mongoose.connection;

db.on('connected', ()=>{
    console.log("MongoDB is Connected");
})

db.on('disconnected', ()=>{
    console.log("MongoDB is Dis-Connected");
})

db.on('error', ()=>{
    console.log("Error while connecting to MongoDB");
})

module.exports= db;