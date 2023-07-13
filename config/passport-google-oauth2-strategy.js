const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

//telling passport to use a newStrategy google-login
passport.use(new googleStrategy({
    clientID: '760373050589-11q5943mcimuvhtrq4gpvcskd349s4r7.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'//to where the google sends the accesstoken
},
    async function (accessToken, refreshToken, profile, done) {
        //profile contains the information
        try {
            let user = await User.findOne({ email: profile.emails[0].value })
            //if user found set in req.user and locals
            if (user) {
                return done(null, user);
            }
            //if user not found create user with random passowrd ans set in req.user and locals
            else {
                let user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                return done(null, user);
            }
        } catch (err) {
            console.log("error in google-passportjs", err);
            return done(null, false);
        }
    }))