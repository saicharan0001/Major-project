const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post);
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user.id
        })
        post.comments.push(comment)
        post.save();
        req.flash('success','Comment Successfull');
        return res.redirect('back');
    } catch (err) {
        req.flash('error','Error in posting comment');
        console.log('err', err);
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id) {
            let postId = comment.post;
            await Comment.findByIdAndDelete(req.params.id)
            //deleting that comment id in comments array of postId in Post
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
           req.flash('success','Comment deleted');
            return res.redirect('back');
        }
        return res.redirect('back');
    } catch (err) {
        console.log('err', err);
    }
}