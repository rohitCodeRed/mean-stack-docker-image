const express = require('express');
const router = express.Router();
const stringify = require('json-stringify');
const logged_user = require('../services/logged_user.service');
const service_auth_user = require('../services/auth_user.service');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

// middleware to authenticate the loggedIn User..

var middleware = async (function (req,res,next) {
  try{
    //console.log(stringify(req.headers));
    let  userId = await (service_auth_user.authBytoken(req.headers['authorization']));
    //console.log(stringify(req.path));
    req.data = {"authUserId":userId};
    next();
  }
  catch(e){
    res.sendStatus(401);
  }

   //return data;
});


router.post('/loggedIn',function(req, res) {

  logged_user.loggedIn(req.body['username'],req.body['password']).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to loggedIn user");
      }
    }).catch(function(err){
      console.log("Login on server",err);
      res.status(400).send(err.message);
    });

});

router.get('/loggedOut',middleware,function(req, res) {

  logged_user.loggedOut(req.data.authUserId).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to loggedOut user");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });

});

router.post('/register',function(req, res) {

  logged_user.resgister(req.body).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to register user");
      }
    }).catch(function(err){
      console.log("Register on server",err);
      res.status(400).send(err.message);
    });

 //res.send(stringify(req));
});

module.exports = router;
