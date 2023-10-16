// ******PACKAGES******
require('dotenv').config();
const express = require('express');
//const router = express.Router();
//const mongoose = require('mongoose');
const app = express();
const Post=  require('../models/postModel');
//const mongoURI=process.env.MONGO_URI;

// ******ROUTES******
//Create 1 new post
app.post('/postOne', async(req, res) => {
    //res.send('Post API')
    try {
        const post= await Post.create(req.body);
        res.status(200).json(post);

    }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//delete 1 post based on postID
app.delete('/deleteOne/:postID', async(req, res) => {
    //res.send('Post API')
    try {
        const postID = req.params.postID;
        const post= await Post.findOneAndDelete({postID: postID});
        res.status(200).json(post);

    }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//update 1 post based on basedID
app.put('/updatePost/:postID', async (req, res) => {
    const postId = req.params.postID;

    try {
        // Find the post by ID
        const existingPost = await Post.findOne({ postID: postId });

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Update the post properties based on the request body
        existingPost.title = req.body.title || existingPost.title;
        existingPost.body = req.body.body || existingPost.body;
        existingPost.category = req.body.category || existingPost.category;

        // Save the updated post
        const updatedPost = await existingPost.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = app;