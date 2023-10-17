// ******PACKAGES******
require('dotenv').config();
const express = require('express');
const app = express();
const Post=  require('../models/postModel');


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
        
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)

        // Retrieve the list of posts, applying limit and offset
        const postsInRange = await Post.find()
            .limit(limit)
            .skip(offset);

        res.status(200).json(postsInRange);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get number of post based on a category
app.get('/getPostsCategory/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const posts = await Post.find({ category: category });

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts in this category' });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = app;