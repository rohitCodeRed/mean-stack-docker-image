const users = require('../model/user_info.model');
const crypto = require('crypto');
const { privateKey } = require('../../config.js');
const jwt = require('jsonwebtoken');
const service_acess_token = {};
const mongoose = require('mongoose');
//const mongoose = require('mongoose').Schema.ObjectId;

const Promise = require('promise');

service_acess_token.getHashToken = getHashToken;
service_acess_token.verifyToken = verifyJwtToken;
service_acess_token.getAuthUserId = getAuthUserId;
service_acess_token.getJwtToken = getJwtToken;
service_acess_token.getJwtToken_For_Api_Acess = getJwtToken_For_Api_Acess;
service_acess_token.create_user_for_api = create_user_for_api;


function getHashToken(password){
 //.....
 let hash = crypto.createHash('md5').update(password).digest('hex');
 return hash;
}

function getJwtToken(token){
  let jwtToken = jwt.sign({"id":token.toString()}, privateKey, { expiresIn:"7d"});
  return jwtToken;
}

function getJwtToken_For_Api_Acess(username,password){
  let acessTokenPromise = new Promise((resolve,reject)=>{
    users.findOne({"password":getHashToken(password),"username":username},function(err,result){
      if(err){
       reject(new Error(err.message));
      }
      else if(!result){
       reject(new Error("User not registered."));
      }
      else{
       resolve(getJwtToken(result._id));
      }
    });
  });

  return acessTokenPromise;
}

function create_user_for_api(data){

  let registerPromise = new Promise((resolve,reject)=>{
    users.findOne({"username":data.username},function(err,result){
      if(!result){

        let hashPass = getHashToken(data.password);
        data.password = hashPass;
        let createUser = new users(data);
        createUser.save(err => {
          if (err) { reject(new Error(err.message));}
          else{resolve({"username":createUser.username,"onCreated":createUser.onCreated});}
        });
      }else{
        reject(new Error("User already exist!"));
      }
    });
  });
  return registerPromise;
}


function verifyJwtToken(token){
  //.....
 let decodePromise = new Promise((resolve,reject)=>{
   jwt.verify(token,privateKey,function(err,result){
     if(!err){
       console.log(result.id);

        resolve(mongoose.Types.ObjectId(result.id));
     }
     else{
       reject(new Error(err.message));
     }
   });
 });

  return decodePromise;
}

function getAuthUserId(token){
 let authIdPromise = new Promise((resolve,reject)=>{
   verifyJwtToken(token).then(function(data){

     users.findOne({"_id":data},function(err,result){
       if(err){
        reject(new Error(err.message));
       }
       else if(!result){
        reject(new Error("Unauthenticate User."));
       }
       else{
        resolve(result._id);
       }

     });

   }).catch(function(err){
       reject(new Error(err.message));
   });
 });
 return authIdPromise;
}



module.exports = service_acess_token;
