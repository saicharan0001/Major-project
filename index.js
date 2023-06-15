const express = require('express');
const app=express();
const port=8000;
const epxressLayouts=require('express-ejs-layouts');

//import database connection from ./config/mongoose
const db = require('./config/mongoose');

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
