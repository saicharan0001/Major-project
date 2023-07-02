//module.exports.action(fn name) = function(req,res){};
const Posts = require('../models/posts');

module.exports.home = function (req, res) {
    //initially the posts.user has only id but after populating it gets all the data related to that id from User model(that we used as ref while defining Post schema)
    Posts.find({}).populate('user')
        .then((posts) => {
            return res.render('home', {
                title: 'Home',
                posts: posts
            });
        })
        .catch((err) => {
            console.log(err);
            return;
        })

}
module.exports.users = function (req, res) {
    return res.send('<h1> you are in users page </h1>');
}
module.exports.orders = function (req, res) {
    return res.send('you are in orders');
}