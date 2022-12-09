const express = require('express');
const app = express();
const mongoose = require('mongoose');
const si = require('systeminformation');
const config = require('./config.js');
const {createHtml} = require('./create_html');
const port = 4000;


app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//setting a port
app.set(port);


//allowing same origin api requests...
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//handle Users api request from client...

app.use('/api/user', require('./app/api/user_api'));

app.use('/', function(req, res) {
   //load the single view file (angular will handle the page changes on the front-end)
  si.getStaticData()
      .then(function(data){
        //console.log(" info: ",data);
        res.send(createHtml(data));
      })
      .catch(function(error){
        console.error(error)
      });

  //res.sendFile("public/home.html",{root: __dirname });
});

app.listen(port, function(){
  console.log('Example app listening on port: '+port);
});






///-----------DATA Base connection-------------------//
mongoose.set('strictQuery', true);
 setTimeout(function() {
  
  mongoose.connect(config.mongoDB_url).catch(error => {
    console.log("Mongo DB connection error: ",JSON.stringify(error.message));
  });

}, 2000);

mongoose.connection.on('error', err => {
  console.log("Mongo DB connection error: ",JSON.stringify(err.message));
});

mongoose.connection.on("connected",()=>{
  console.log("\n**-----------MongoDB connection established------------**\n DB:",config.dbName,"\n Host:",config.dbHost,"\n Port:",config.dbPort);
});



