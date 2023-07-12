const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');
module.exports.index = async (req, res) => {
    const post = await Post.find({})
    return res.json(200, {
        message: 'List of posts',
        posts: post
    })
}

module.exports.delete = async (req, res) => {
    // let post = await Post.findById(req.params.id);
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ post: req.params.id });
        return res.json(200, {
            message: 'Post deleted'
        })
    }
    catch {
        return res.json(200, {
            message: 'Post not deleted',
        })
    }
}