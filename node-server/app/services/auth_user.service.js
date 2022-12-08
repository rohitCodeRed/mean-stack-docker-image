const users = require('../model/user_info.model');
const acess_token = require('./acess_token.service');
const Promise = require('promise');
const service_auth_user = {};

service_auth_user.authBytoken = authBytoken;


function authBytoken(token){
 let authPromise = new Promise((resolve,reject)=>{
   if(token){
     token = token.split(" ");
     if(token.length > 1){
       acess_token.getAuthUserId(token[1]).then(function(authUserId){
         resolve(authUserId);
       }).catch(function(err){
         reject(new Error(err.message));
       });
     }

   }
   else{
     reject(new Error("Authorization not define."));
   }


 });
 return authPromise;
}

module.exports = service_auth_user;
