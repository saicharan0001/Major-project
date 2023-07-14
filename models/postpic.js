const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
// const Post = require('./posts');
const POSTPIC_PATH = path.join('/uploads/users/postpics');

const postpicSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postpic: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
}, {
    timestamps: true
});

//configuring multer in diskstorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'..',POSTPIC_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

postpicSchema.statics.uploadedPostpic = multer({storage : storage}).single('postpic');
postpicSchema.statics.postpicPath = POSTPIC_PATH;

const Postpic = mongoose.model('Postpic',postpicSchema);
module.exports = Postpic;