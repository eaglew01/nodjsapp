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
app.delete('/deletePost/:postID', async(req, res) => {
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

//update 1 post based on postID
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

//get all posts
app.get('/getAllPosts', async (req, res) => {
    try {
        // Retrieve the list of all posts
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get number of post based on a range of postID
app.get('/getPosts', async (req, res) => {
    try {
        // Set default values for limit and offset or extract them from the query parameters
        const limit = parseInt(req.query.limit) //|| 3; // Default limit to 10 if not provided
        const offset = parseInt(req.query.offset) //|| 2; // Default offset to 0 if not provided

        // Retrieve the list of posts with postID in the range from 1 to 5, applying limit and offset
        const postsInRange = await Post.find()
            .limit(limit)
            .skip(offset);

        res.status(200).json(postsInRange);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = app;