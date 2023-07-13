const User = require('../models/users');
const passport = require('passport');
const fs = require('fs');
const path = require('path');

module.exports.users = function (req, res) {
    res.send('iam at user');
}

//render the signup page
module.exports.signUp = function (req, res) {
    //if the user is already signed in he/she should not visit signup page
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'codeial | signUp'
    })
}

//render the signin page
module.exports.signIn = function (req, res) {
    //if the user is already signed in he/she should not visit signin page
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'codeial | signIn'
    })
}

//create an user in database
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) return res.redirect('back');
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                User.create(req.body)
                    .then((user) => {
                        req.flash('success', 'User Created Successfully');
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err) => {
                        req.flash('error', 'Cant create user');
                        console.log('error in creating user');
                        return;
                    })
            }
            else {
                req.flash('error', 'User already have an account try sign-in');
                return res.redirect('back');
            }
        })
        .catch((err) => {
            console.log('error in finding user');
        })
}

//create a session with user(create a Token)
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    //assuming user is signed in
    return res.redirect('/');
}

//Destroy the session or logout
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'You are Logged out');
        return res.redirect('/');
    })
}

//render profile page
module.exports.profile = async (req, res) => {
    //req.user.id is us
    //req.params.id is friend
    let me = await User.findById(req.user.id);
    let myfriends = me.friends;
    let havefriend = false;
    for (i of myfriends) {
        if (i._id == req.params.id) {
            havefriend = true;
        }
    }
    let cur;
    if(havefriend){
        cur = 'Unfollow'
    }
    else{
        cur = 'Follow'
    }
    User.findById(req.params.id)
        .then((user) => {
            res.render('user_profile', {
                title: 'User Profile',
                profile_user: user,
                cur: cur
            });
        });
}

//{name : req.body.name , email :req.body.email} is same as passing req.body it automatically fetches respective fields
module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id) {
        let user = await User.findById(req.params.id);

        //here the form is multipart encoded so cant use req.body directly
        User.uploadedAvatar(req, res, function (err) {
            //now we can use req.body
            user.name = req.body.name;
            user.email = req.body.email;
            if (req.file) {
                if (user.avatar) {
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }

                //this is saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();
            return res.redirect('back');
        })

    }
    else {
        return res.status(401).send('Unautharized');
    }
}