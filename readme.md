GITHUB LINK = https://github.com/eaglew01/nodjsapp.git
Start API with <<npm run dev>>
To acces it locally use <<127.0.0.1:3000>>

This API has the following features:


CRUD INTERFACES:

#USER



#POST
/post



##Post 1 post in database
/postOne

##Delete 1 post in database based on postID
/deletePost/<<PostID number>>

GET
Get all posts in database
/getAllPosts

Get post based on limit and offset
limit = limits the return value
offset = skips postts
/getPosts?limit=<<limit>>&offset=<<offset>>

GET

get all users from database

EXTRAS
-The mongoDB URI and password is not on github, but stored in a seperate .env file.

-Added encryption to the password send to the databae
    https://www.geeksforgeeks.org/password-encryption-in-node-js-using-bcryptjs-module/