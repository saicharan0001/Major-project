const express = require('express');
const app=express();
const port=8000;

//using express router
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log('error in server');
        return;
    }
    console.log('server is set succesfully on port :',port);
    return;
})