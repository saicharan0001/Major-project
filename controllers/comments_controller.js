const Comment =  require('../models/comment');
const Post = require('../models/posts');

module.exports.create = (req,res)=>{
    Post.findById(req.body.post)
    .then((post)=>{
        if(post){
        console.log('comment success');
            Comment.create({
                content : req.body.content,
                user : req.user._id,
                post:req.body.post
            })
            .then((comment)=>{
                post.comments.push(comment);
                post.save();
            })
        }
    })
    return res.redirect('back');
}