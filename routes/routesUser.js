// ******PACKAGES******
//require('dotenv').config();
const express = require('express');
//const router = express.Router();
//const mongoose = require('mongoose');
const app = express();
const User=  require('../models/userModel');
//const mongoURI=process.env.MONGO_URI;


// ******ROUTES******
//Create 1 new user
app.post('/postOne', async(req, res) => {
    //res.send('Post API')
    try {
        const user= await User.create(req.body);
        res.status(200).json(user);

    }
  catch(error){
      res.status(500).json({message: error.message})
  }
})


//Update 1 user based on userID
app.put('/updateUser/:userID', async (req, res) => {
    const userID = req.params.userID;
    try {
        // Find the user by ID
        const existingUser = await User.findOne({ userID: userID });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user properties based on the request body
        existingUser.nickname = req.body.nickname || existingUser.nickname;
        existingUser.lastname = req.body.lastname || existingUser.lastname;
        existingUser.firstname = req.body.firstname || existingUser.firstname;
        existingUser.password = req.body.password || existingUser.password;
        existingUser.phonenumber = req.body.phonenumber || existingUser.phonenumber;
        existingUser.email = req.body.email || existingUser.email;

        // Save the updated user
        const updatedUser = await existingUser.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Get all Method
app.get('/getAll', async(req, res) => {
    //res.send('Get All API')
    try {
    const users = await User.find({});
    res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Get one Method based on userID
app.get('/getOne/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findOne({ userID: userID });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get one based on nickname
app.get('/getByNickname/:nickname', async (req, res) => {
    try {
        const nickname = req.params.nickname;
        const user = await User.findOne({ nickname: nickname });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one user based on firstname and lastname
app.get('/getByFirstnameLastname', async (req, res) => {
    try {
        const { firstname, lastname } = req.query;

        if (!firstname || !lastname) {
            return res.status(400).json({ message: 'Invalid request. Provide both firstname and lastname.' });
        }

        const query = {
            firstname: new RegExp(firstname, 'i'),
            lastname: new RegExp(lastname, 'i')
        };

        const user = await User.findOne(query);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//Get all Method and sort dec on alphabet based on nickname
app.get('/getAllSortOnNickname', async(req, res) => {
    //res.send('Get All API')
    try {
    var sortOnNickName= {nickname: -1};
    const users = await User.find({}).sort(sortOnNickName);
    
    

    res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})


//Delete by nickname
app.delete('/deletenickname/:nickname', async(req, res) => {
    try {
        const nickname = req.params.nickname;
        const user = await User.findOneAndDelete({ nickname: nickname });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//Delete by userID
app.delete('/deleteuserid/:userID', async(req, res) => {
    try {
        const userID = req.params.userID;
        const user = await User.findOneAndDelete({ userID: userID });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = app;