require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User=  require('./models/userModel');
const mongoURI=process.env.MONGO_URI;


console.log('Mongouri', mongoURI);

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTES
app.get('/', function (req, res) {
    res.send('Hello World2')
  })


//get al users from database
app.get('/user', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//get 1 user from database based on ID
app.get('/user/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// create new user in database
app.post('/user', async(req, res) => {
    try {
          const user= await User.create(req.body);
          res.status(200).json(user);
  
      }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//adapt 1 user from database
// update a product
app.put('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DATABASE CONNECTION
mongoose.set("strictQuery", false)
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log("Database is connected")
    app.listen(3000, ()=> {
        console.log("Node API runs on port 3000")
    });
}).catch((error) =>{
    console.log(error)})