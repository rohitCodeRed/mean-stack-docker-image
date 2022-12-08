const express = require('express');
const router = express.Router();
const stringify = require('json-stringify');
const acess_token = require('../services/acess_token.service');


router.post('/register',function(req, res) {

    acess_token.create_user_for_api(req.body).then(function(result){
      if(result){
        console.log(result);
        res.send({"registered":true,"data":result});
      }else{
        res.status(400).send("Unable to registered users for api acess.");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });

});

router.post('/get_token',function(req, res) {

  acess_token.getJwtToken_For_Api_Acess(req.body['username'],req.body['password']).then(function(result){
      if(result){
        console.log(result);
        res.send({"token":result});
      }else{
        res.status(400).send("Unable to get Token.");
      }
    }).catch(function(err){
      res.status(400).send(err.message);
    });

});

module.exports = router;
