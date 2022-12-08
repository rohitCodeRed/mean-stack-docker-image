const express = require('express');
const app = express();
const mongoose = require('mongoose');
const si = require('systeminformation');
const config = require('./config.js');
const {createHtml} = require('./create_html');
const port = process.env.PORT || 3001;


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
        res.send(createHtml());
      })
      .catch(function(error){
        console.error(error)
      });

  //res.sendFile("public/home.html",{root: __dirname });
});

app.listen(port, function(){
  console.log('Example app listening on port: '+port);
});

//Connecting to mongoDB
mongoose.connect(config.mongoDB_url,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
//adding promise library to mongoose object..
//mongoose.Promise = global.Promise;
let db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//monitering connection of MongoDB
db.then(function(result){
  console.log("\n**-----------MongoDB connection established------------**\n DB:",result.name,"\n Host:",result.host,"\n Port:",result.port);
  console.log("Timer closed.");
//clearInterval(timerId);
},function(error){
  console.log("Mongo DB connection error: ",JSON.stringify(error.message));
  //console.log("\n\n-----Trying reconnecting... after 2 sec----");
})



