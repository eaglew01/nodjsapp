const mongoose=require('mongoose');
const validator=require('validator');

const userSchema=new mongoose.Schema({
        lastname: {
        type: String, 
        require: true,
        unique: true,
        },
        firstname: {
        type: String, 
        require: true,
        unique: true,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },
        phoneNumber: {
        type: String,
        unique: true,
        validate: [validator.isMobilePhone, "Dit is geen geldig telefoonnummer"]
        }
    });

const User = mongoose.model('User', userSchema);
module.exports=User;

