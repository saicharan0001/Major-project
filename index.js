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
//using express router
app.use('/',require('./routes'));
//setting up view engines
app.set('view engine','ejs');
app.set('views','./views');
//this is required to listen the server in port(8000) if error runs callback function
app.listen(port,(err)=>{
    if(err){
        console.log('error in server');
        return;
    }
    console.log('server is set succesfully on port :',port);
    return;
})
