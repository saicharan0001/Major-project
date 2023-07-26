//module.exports.action(fn name) = function(req,res){};
const Posts = require('../models/posts');
const User = require('../models/users');
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
        let allfriends = [];
        if (req.user) {
            allfriends = await Users.findById(req.user.id).populate('friends');
            // console.log("all friends", allfriends.friends);
            allfriends = allfriends.friends;
        }
        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users: users,
            allfriends: allfriends
        })
    } catch (err) {
        console.log("error in asyn/await");
        return;
    }
}

module.exports.knowrelation = (req, res) => {
    return res.render('knowrelation', {
        title: 'knowrelation',
        data: []
    })
}

module.exports.findRelation = async (req, res) => {
    let their = await Users.findOne({ name: req.body.relation });
    if (their) {
    }
    else {
        return res.render('knowrelation', {
            title: 'knowrelation',
            data: ['No user found']
        });
    }
    if (req.user.id == their.id) {
        return res.render('knowrelation',{
            title:'knowrelation',
            data:['You are the only one']
        });
    }
    let theirid = their._id;
    let allusers = await User.find({});
    let mpp = [];
    for (i of allusers) {
        mpp[i._id] = i.friends;
        // console.log(i._id,mpp[i._id]);
    }
    //    for(x in mpp){
    //     console.log(x,mpp[x]);
    //    }
    // for (i in mpp[req.user.id]) {
    //     console.log(mpp[req.user.id][i]);
    // }
    var visited = [];
    var queue = [];
    var arr = [];
    let relation_exist=0;
    queue.push(req.user.id);
    arr[req.user.id] = -1;
    visited[req.user.id] = 1;
    while (queue.length != 0) {
        let front = queue.shift();
        // console.log("user:", front);
        if (front == their.id) {
            // console.log("hello");
            relation_exist=1;
            break;
        }
        for (i in mpp[front]) {
            if (visited[mpp[front][i]]) {
                continue;
            }
            queue.push(mpp[front][i]);
            arr[mpp[front][i]] = front;
            visited[mpp[front][i]] = 1;
        }
    }
    if(relation_exist==0){
        //  User.findById()
        return res.render('knowrelation',{
            title:'knowrelation',
            data:[req.user.name,'No relation Exist',their.name]
        });
    }
    // let usernames = await Users.find({}).populate('frineds');
    let x = theirid;
    let finalans = [];
    while (true) {
        // console.log(x);
        let user = await User.findById(x);
        finalans.push(user.name);
        x = arr[x];
        if (x == -1) break;
    }
    finalans.reverse();
    // for(i in finalans){
    //     let user = await User.findById(finalans[i]);
    //     console.log(user.name);
    // }

    return res.render('knowrelation', {
        title: 'knowrelation',
        data: finalans,
    })
    // return res.redirect('back');
}