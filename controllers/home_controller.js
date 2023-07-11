//module.exports.action(fn name) = function(req,res){};
const Posts = require('../models/posts');
const Users = require('../models/users');
module.exports.home = async function (req, res) {
    //initially the posts.user has only id but after populating it gets all the data related to that id from User model(that we used as ref while defining Post schema)
    try {
        const posts = await Posts.find({})
        .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })

        const users = await Users.find({})

        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users: users
        })
    } catch (err) {
        console.log("error in asyn/await");
        return;
    }
}
