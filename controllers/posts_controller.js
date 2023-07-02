const User = require('../models/users');
const Post = require('../models/posts');
const passport = require('passport');

module.exports.create=(req,res)=>{
    Post.create({
        content:req.body.content,
        user : req.user._id
    })
    .then((post)=>{return res.redirect('back')})
    .catch((err)=>{console.log(err);return res.redirect('back')});
}