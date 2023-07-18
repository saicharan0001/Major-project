const User = require('../models/users');
const Friends = require('../models/friendship');

module.exports.togglefriends = async (req, res) => {
    let me = req.user.id;
    let myfriend = req.query.id;
    console.log(me);
    console.log(myfriend);
    let user1 = await User.findById(me);
    let user2 = await User.findById(myfriend);
    let allmyfriends = await User.findById(me).populate('friends');
    let myfriendsarray = allmyfriends.friends;//gives the friends array of me
    // console.log(myfriendsarray);

    let havefriend = false;
    for (i of myfriendsarray) {
        if (i._id == req.query.id) {
            havefriend = true;
        }
    }
    
    if (havefriend) {
        console.log('removing freind');
        await Friends.deleteMany({
            from_user: me,
            to_user: myfriend
        })
        await Friends.deleteMany({
            from_user: myfriend,
            to_user: me
        })
        user1.friends.pull(myfriend);
        user1.save();
        user2.friends.pull(me);
        user2.save();
    }
    else {
        console.log('adding friend');
        await Friends.create({
            from_user: me,
            to_user: myfriend
        })
        user1.friends.push(myfriend);
        user1.save();
        user2.friends.push(me);
        user2.save();
    }
    if(req.xhr){
        if(havefriend==false){
          var data = 'Unfollow';
        }
        else{
            data = 'Follow';
        }
        return res.json(200,{
            message : 'success',
            data : data
        })
    }
    return res.redirect('back');
}