const User = require('../models/users');
const Post = require('../models/posts');
const passport = require('passport');
const Comment = require('../models/comment');
const Like = require('../models/like');
const fs = require('fs');
const path = require('path');
const Postpic = require('../models/postpic');

module.exports.create = async (req, res) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "posted !",
                flash: {
                    success: 'Posted!'
                },
                username: req.user.name
            })
        }
        req.flash('success', 'Posted!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Unable to post');
        console.log('err', err);
    }

}

module.exports.destroy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // .id means converting the object id into string ,(req.user._id)
        if (post.user == req.user.id) {
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({ post: req.params.id });
            await Like.deleteMany({
                user: req.user.id,
                likeable: req.params.id,
                onModel: 'Post'
            });
            // await Like.deleteMany(id: {$in: post.comments});
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted",
                    flash: {
                        success: 'Post deleted'
                    }
                });
            }
        }

        req.flash('success', 'Post deleted');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'You cant delete this post');
        console.log('err', err);
    }

}

module.exports.postpic = (req, res) => {

    Postpic.uploadedPostpic(req, res, async function (err) {
        if (err) console.log(err);
        console.log(req.file);
        await Postpic.create({
            user : req.user.id,
            postpic : Postpic.postpicPath + '/' + req.file.filename,
            content : req.body.content
        })
        return res.redirect('back');
    })

    // return res.redirect('back');
}

