//const { default: TypedRegistry } = require('chart.js/dist/core/core.typedRegistry');
const mongoose= require('mongoose');
const validator=require('validator');
const bcrypt = require('bcryptjs');

const nameValidator = [
    {
      validator: value => /^[A-Za-z ]+$/.test(value),
      message: 'A name can only contain alphabetic characters and spaces',
    },
  ];
  

var userSchema=new mongoose.Schema({
        userID: Number, 
        nickname: {
        type: String, 
        require: true,
        unique: true,
        },
        lastname: {
        type: String, 
        require: true,
        validate: nameValidator,
        //validate: [validator.isAlpha(String, 'en-US,fr-FR,de-DE', {ignore:' /'}), "A lastname cannot contain numbers"],
        },
        firstname: {
        type: String, 
        require: true,
        validate: nameValidator,
        //validate: [validator.isAlpha, "A firstname cannot contain numbers"],
        },
        password: {
        type: String,
        require: true,
        minLength: 8,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },
        phoneNumber: {
        type: String,
        unique: true,
        validate: [validator.isMobilePhone, "Not a valid phone number"]
        },
        email: {
        type: String,
        require: true,
        unique: true,
        validate: [validator.isEmail, "Not a valid email adress"]
        },
    },
    {userID: false});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

// //Middleware to give a unique autoincremented ID to the user
// userSchema.pre("save", function (next) {
//      let doc = this;
//      sequencing.getSequenceNextValue("user_id").
//      then(counter => {
//          console.log("asdasd", counter);
//          if(!counter) {
//              sequencing.insertCounter("user_id")
//              .then(counter => {
//                  doc.userID = counter;
//                  console.log(doc)
//                  next();
//              })
//              .catch(error => next(error))
//          } else {
//              doc.userID = counter;
//              next();
//          }
//      })
//      .catch(error => next(error))
//  });

const User = mongoose.model('User', userSchema);
module.exports=User;