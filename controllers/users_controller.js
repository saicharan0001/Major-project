const User = require('../models/users');
const passport = require('passport');
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
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err) => {
                        console.log('error in creating user');
                        return;
                    })
            }
            else return res.redirect();
        })
        .catch((err) => {
            console.log('error in finding user');
        })
}

//create a session with user(create a Token)
module.exports.createSession = function (req, res) {
    //assuming user is signed in
    return res.redirect('/');
}

//Destroy the session or logout
module.exports.destroySession = (req, res) => {
     req.logout((err)=>{
        if(err) return next(err);
        return res.redirect('/');
     })
}

//render profile page
module.exports.profile = (req, res) => {
    res.render('user_profile', {
        title: 'User Profile'
    })
}