Read on github to get formatting syntax


GITHUB LINK = https://github.com/eaglew01/nodjsapp.git


Start API with <<npm run dev>>
To acces it locally use <<127.0.0.1:3000>>

This API has the following features:


CRUD INTERFACES:

# ******USER******
/user


## POST: create 1 new user
/postOne

## GET: get all users in database collection
/getAll

## GET : Get one user based on userID
/getOne/:userID

## GET: Get one user based on nickname
/getByNickname/:nickname

## GET: Get all users and sort on nickname alphabetically
/getAllSortOnNickname

## DELETE:  Delete one user based on nickname
/deletenickname/:nickname

## DELETE: Delete on user based on userID
/deleteuserid/:userID

## PUT: Update update 1 post based on userID
/updateUser/:userID

# ******POST******
/post


## POST: create 1 new post
/postOne
Use the convenant yaml file

## Delete 1 post in database collection based on postID
/deletePost/:postID


## GET all posts in database collection
/getAllPosts

## GET post based on limit and offset
limit = limits the return value
offset = skips postts
/getPosts?limit=<<limit>>&offset=<<offset>>

## GET all posts off a certain category
/getPostsCategory/:category

## PUT update 1 post based on postID
updatePost/:postID

get all users from database

# EXTRAS
-The mongoDB URI and password is not on github, but stored in a seperate .env file.

-Added encryption to the password send to the databae
    https://www.geeksforgeeks.org/password-encryption-in-node-js-using-bcryptjs-module/