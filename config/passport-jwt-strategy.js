// //Setting up JWT strategy
// const passport = require('passport');
// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const User = require('../models/users');

// let opts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
//     key : 'charan',
// }

// passport.use(new JWTstrategy(opts, async function (jwtPayLoad, done) {
//     try {
//         let user = await User.findById(jwtPayLoad._id);
//         if (user) {
//             return done(null, user);
//         }
//         return done(null, false);
//     }
//     catch {
//         console.log('error in finding user from jwt');
//         return;
//     }
// }))

// module.exports = passport;