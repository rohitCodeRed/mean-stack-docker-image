const express = require('express');
//const request = require('request');
//var rp = require('request-promise');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const stringify = require('json-stringify');
const router = express.Router();
const service_user =  require('../services/user_info.service');     // get an instance of the express Router
const service_auth_user = require('../services/auth_user.service');


// middleware to authenticate the loggedIn User..

var middleware = async (function (req,res,next) {
  try{
    let  userId = await (service_auth_user.authBytoken(req.headers['authorization']));
    //console.log(stringify(req.path));
    req.data = {"authUserId":userId};
    next();
  }
  catch(e){
    res.status(400).send(e.message);
    //next();
  }

   //return data;
});


router.get('/list',middleware,function(req, res) {

  service_user.getListUser(req.data.authUserId).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to list user");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });

});

router.get('/find/:id',middleware,function(req, res) {

  service_user.getInfoById(req.data.authUserId,req.params.id).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to find user");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });

});

router.post('/create',middleware,function(req,res){

  console.log(req.body);
  service_user.createUser(req.data.authUserId,req.body).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to create user");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });
});


router.put('/update/:id',middleware,function(req,res){
  delete req.body["username"];
  delete req.body["_id"];
  service_user.updateUser(req.data.authUserId,req.params.id,req.body).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to update user");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });
});

router.delete('/delete/:id',middleware,function(req,res){
  service_user.deleteUser(req.data.authUserId,req.params.id).then(function(result){
      if(result){
        console.log(result);
        res.send(result);
      }else{
        res.status(400).send("Unable to delete user");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });
});
/*router.get('/user/:custId/plan', function(req, res) {
//console.log("name: "+req.params.name);
  service_user.getInfo(req.params.custId).then(function(data){
    if(data){
      res.send(data);
    }else{
      res.status(400).send("Unable to find data");
    }
  }).catch(function(err){
    res.sendStatus(400);
  });

});*/

module.exports = router;
