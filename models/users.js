const mongoose = require('mongoose');

//Creating a new schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
   timestamps : true
});

//Telling mongoose that this is a model
const User = mongoose.model('User',userSchema);

//exporting model 
module.exports = User;

