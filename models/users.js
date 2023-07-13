const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Friends = require('./friendship');
//where files are stored
const AVATAR_PATH = path.join('/uploads/users/avatars');

//Creating a new schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

//configuring multer in diskstorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//static methods(To use this User.uploadedAvatar,User.avatarPath)
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

//Telling mongoose that this is a model
const User = mongoose.model('User', userSchema);

//exporting model 
module.exports = User;

