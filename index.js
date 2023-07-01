const express = require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000;
//importing express layouts for views
const epxressLayouts=require('express-ejs-layouts');
//import database connection from ./config/mongoose
const db = require('./config/mongoose');
//importing model
const Users=require('./models/users');
//middle ware to parse the form data in req.body as an object

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
//telling app to use cookieparser
app.use(cookieParser());
//Using Layouts before accesing routes
app.use(epxressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//using css and scripts links for views
app.use(express.static('./assets'));

//middleware that takes cookies and encrypts it
app.use(session({
    name:'codeial',
    secret:'charan',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //mongo store is used to store the cookies in db
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development',
        autoRemove:'disabled'
    },function(err){
        console.log('error');
        return ;
    })
}));
app.use(passport.initialize());
app.use(passport.session());

//so when ever a new request comes in this middleware checks if the user is authenticated and then pass user data to views
app.use(passport.setAuthenticatedUser);


//setting up view engines
app.set('view engine','ejs');
app.set('views','./views');

//using express router
app.use('/',require('./routes'));

//this is required to listen the server in port(8000) if error runs callback function
app.listen(port,(err)=>{
    if(err){
        console.log('error in server');
        return;
    }
    console.log('server is set succesfully on port :',port);
    return;
})
