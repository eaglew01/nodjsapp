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



// //Create 1 new user
// app.post('/user/postOne', async(req, res) => {
//     //res.send('Post API')
//     try {
//         const user= await User.create(req.body);
//         res.status(200).json(user);

//     }
//   catch(error){
//       res.status(500).json({message: error.message})
//   }
// })

// //Update 1 user



// //Get all Method
// app.get('/user/getAll', async(req, res) => {
//     //res.send('Get All API')
//     try {
//     const users = await User.find({});
//     res.status(200).json(users);
//     } 
//     catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //Get one Method based on userID
// app.get('/user/getOne/:userID', async (req, res) => {
//     try {
//         const userID = req.params.userID;
//         const user = await User.findOne({ userID: userID });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get one based on nickname
// app.get('/user/getByNickname/:nickname', async (req, res) => {
//     try {
//         const nickname = req.params.nickname;
//         const user = await User.findOne({ nickname: nickname });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// //Get all Method and sort dec on alphabet based on nickname
// app.get('/user/getAllSortOnNickname', async(req, res) => {
//     //res.send('Get All API')
//     try {
//     var sortOnNickName= {nickname: -1};
//     const users = await User.find({}).sort(sortOnNickName);
    
    

//     res.status(200).json(users);
//     } 
//     catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //Get by ID Method
// app.get('/user/getOneID/:id', async(req, res) => {
//     try{
//         const data = await User.findById(req.params.id);
//         res.json(data)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

// //Update by ID Method
// app.patch('/user/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by nickname
// app.delete('/user/deletenickname/:nickname', async(req, res) => {
//     try {
//         const nickname = req.params.nickname;
//         const user = await User.findOneAndDelete({ nickname: nickname });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

// //Delete by nickname
// app.delete('/user/deleteuserid/:userID', async(req, res) => {
//     try {
//         const userID = req.params.userID;
//         const user = await User.findOneAndDelete({ userID: userID });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })


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