const express = require('express');
const app = express();
const stringify = require('json-stringify');
//var router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const si = require('systeminformation');
const config = require('./config.js');
const port = process.env.PORT || 3001;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));


//app.use(express.static(__dirname + '/public'));

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
app.use('/api/logged', require('./app/api/logged_user_api'));
app.use('/api/apiAcess',require('./app/api/api_acess'));

app.use('/', function(req, res) {
   //load the single view file (angular will handle the page changes on the front-end)
  si.getStaticData()
      .then(function(data){
        //console.log(" info: ",data);
        res.send( HtmlPart().start +createView(data)+HtmlPart().end);
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



//----------- Web HTML creation with server static data.....
function createView(data){
  var innerhtml =``;
  for (var obj in data){

    if (typeof data[obj] === 'object'){
      innerhtml = innerhtml +
                  HtmlPart().innerhtmlStart +
                  HtmlPart().panelViewStart +
                  HtmlPart().panelViewhead +
                  `<h3 align="center">${obj}</h3>`+
                  HtmlPart().panelViewheadEnd +
                  HtmlPart().panelBodyStart +
                  createListView(data[obj],obj)+
                  HtmlPart().panelBodyEnd +
                  HtmlPart().panelViewEnd +
                  HtmlPart().innerhtmlEnd;

                  //console.log("html--------",createListView(data[obj]));
            }

  }

  return HtmlPart().tophtmlStart + innerhtml + HtmlPart().tophtmlEnd;
}


//recursion function for inner key value pair....
function createListView(data,key){

  var list=``;
  for(var obj in data){
    if(typeof data[obj] === 'object'){
      list = list + `<li class="list-group-item">` +HtmlPart().panelViewStart +
                HtmlPart().panelViewhead +
                  `<h4 align="center">${key}-${obj}</h4>` +
                    HtmlPart().panelViewheadEnd +
                      HtmlPart().panelBodyStart +
                        createListView(data[obj],obj) +
                          HtmlPart().panelBodyEnd+
                            HtmlPart().panelViewEnd +`</li>`;

    }

     else if(typeof data[obj] === 'string' || typeof data[obj] === 'number'){
       if(data[obj]){
         list = list +`<li class="list-group-item"><b>${obj}</b> : ${data[obj]}</li>`;
       }
      }

  }
  if(!list){
    return "";
  }
  return HtmlPart().htmllistStart + list + HtmlPart().htmlListEnd;
}

//return basic html tag.......
function HtmlPart(){
  var obj = {
    tophtmlStart:'<div class="container"><div class="row">',
    tophtmlEnd :'</div></div>',
    innerhtmlStart:'<div class="col-md-6">',
    panelViewStart:'<div class="panel panel-default">',
    panelViewhead:'<div class="panel-heading">',
    panelViewheadEnd : '</div>',
    panelBodyStart:'<div class="panel-body">',
    panelBodyEnd:'</div>',
    panelViewEnd:'</div>',
    innerhtmlEnd:'</div>',
    htmllistStart:'<ul class="list-group">',
    htmlListEnd:'</ul>',
    start:`<!doctype html>
            <html>
            <head>
                <!-- META -->
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1"><!-- Optimize mobile viewport -->

                <title>Node Server</title>

                <!-- SCROLLS -->
                <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"><!-- load bootstrap -->
                <style>
                    html{ overflow-y:scroll; }
                    body{ padding-top:50px;
                          font-family: Nunito,Helvetica Neue,Helvetica,Arial,sans-serif;
                        }
                        .list-group-item{
                          border:none;
                        }
                        .jumbotron{
                          background-color:#d8e5f9;
                        }
                        .panel-default > .panel-heading {
                          background-color: #d7fcc0;
                        }
                </style>
              </head>
              <body>
                <div class="container">
                    <div class="jumbotron text-center">
                      <h1>Server Static Info</h1>
                    </div>
                  </div>`,

      end:"</div></body></html>"
    }
    return obj;
}
