const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/users');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
   //email password is passed on from route directly ans done is a callback fn
   function(email,password,done){
    User.findOne({email:email})
    .then((user)=>{
        if(!user||user.password!=password){
            conosle.log("invalid username or password");
            //here done has two arguments one is null which tells there is no error and false tells authentication false;
            return done(null,false);
        }
        //null : no error and user object is sent to serialize
        return done(null,user);
        
    })
    .catch((err)=>{
        console.log("erorr in finding user passport");
        //done can take 2 arguments but here we are just using 1
        return done(err);
    })
   }
))

//after done(null,user) is executed user id has to be stored in encrypted form in cookies
//serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user,done){
    return done(null,user.id);
    //user.id is stored in cookies in encrypted format
})

//desrialize the user from key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{
           return done(null,user);
    })
    .catch((err)=>{
           console.log("erorr in finding user passport");
           return done(err);
    })
})

//check if the user is authenticated
//middleware that can be used whenver the user authentication is required to view a page 
//then call this middleware if yes next mentioned function will be excuted that can be a controller
passport.checkAuthentication=(req,res,next)=>{
    //if the user is signed in pass on the request to next function
   if(req.isAuthenticated()){
        return next();
   }
   //if the user is not signed in
   return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are passing it to locals for using the user in views
        res.locals.user=req.user;
    }
    return next();
}

module.exports=passport;