const express = require('express');
const app=express();
const port=8000;

app.listen(port,(err)=>{
    if(err){
        console.log('error in server');
        return;
    }
    console.log('server is set succesfully on port :',port);
    return;
})