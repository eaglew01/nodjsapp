//******PACKAGES******
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoURI=process.env.MONGO_URI;
//Check if MongoURI is passed
console.log('MongoURI=', mongoURI);

//******MIDDLEWARE******
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//*******ROUTES********
//User route
const userRoutes = require('./routes/routesUser');
app.use('/user', userRoutes);
//Post route
const postRoutes = require('./routes/routesPost');
app.use('/post', postRoutes);

//******DATABASE CONNECTION******
mongoose.set("strictQuery", false)
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log("Database is connected")
    app.listen(3000, ()=> {
        console.log("Node API runs on port 3000")
    });
}).catch((error) =>{
    console.log(error)})