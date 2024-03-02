const express = require('express')
const cors = require('cors');
const db = require('./db')
const bodyParser = require('body-parser');

const app = express();

// Enable CORS for all routes
app.use(cors());
require('dotenv').config(); 
app.use(bodyParser.json())


// endpointsc

const taskRoute = require('./routes/taskRoute');

// Use the routers
app.use('/task', taskRoute);
app.use('/task:id', taskRoute);


app.get('/', (req, res)=>{
    res.send({
        Status: "Running",
        Message: "Welcome to my application"
    })
    console.log("Welcome to my application");
})

app.listen(5000, ()=>{
    console.log("Server is runnig ");
})