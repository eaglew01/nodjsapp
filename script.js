const express = require('express');
const mongoose = require('mongoose');

const app = express()
mongoose
.connect('mongodb+srv://wouterdecleer258:HjdRYLqLBBH3Rwuo@clusterfornodejsapp.0cervla.mongodb.net/NodeJSApp?retryWrites=true&w=majority')
.then(() =>{
    console.log("Database is connected")
    app.listen(3000, ()=> {
        console.log("Node API runs on port 3000")
    })
})
.catch((Error) =>{
    console.log(Error)
})
app.get('/test', function (req, res) {
  res.send('Hello World2')
})

