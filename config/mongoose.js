const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db=mongoose.connection;

//If there is any error
db.on('error',console.error.bind(console,'error connecting to mongodb'));

//if connected succefully
db.once('open',function(){
  console.log('connection to database :: MongoDB');
});

//export db to use in index.js
module.exports = db;
