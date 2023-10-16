//const { default: TypedRegistry } = require('chart.js/dist/core/core.typedRegistry');
const mongoose= require('mongoose');
const validator=require('validator');

const tagValidator = [
    {
      validator: value => /^[A-Za-z ]+$/.test(value),
      message: 'A tag can only contain alphabetic characters and spaces',
    },
  ];
  

var postSchema=new mongoose.Schema({
        postID: {
        type: Number,
        },
        title: {
        type: String, 
        require: true,
        unique: true,
        },
        body: {
        type: String, 
        require: true,
        },
        category: {
        type: String, 
        require: true,
        validate: tagValidator,
        //validate: [validator.isAlpha, "A tag cannot contain numbers"],
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },

    }
 );

const Post = mongoose.model('Post', postSchema);
module.exports=Post;