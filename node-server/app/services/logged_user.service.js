const users = require('../model/user_info.model');
const Promise = require('promise');
const loggedOutPromise = require('promise');

const logged_user = {};
const acess_token = require('./acess_token.service');

logged_user.resgister = resgister;
logged_user.loggedIn = loggedIn;
logged_user.loggedOut = loggedOut;


function resgister(data){

  let registerPromise = new Promise((resolve,reject)=>{
    users.findOne({"username":data.username},function(err,result){
      if(!result){
        let hashPass = acess_token.getHashToken(data.password);
        data.password = hashPass;
        let createUser = new users(data);
        createUser.save(err => {
          if (err) { reject(new Error(err.message));}
          else{resolve({"username":createUser.username,"nickname":createUser.nickname,"onCreated":createUser.onCreated});}
        });
      }else{
        reject(new Error("User already exist!"));
      }
    });
  });

  //console.log("promise",registerPromise);
  return registerPromise;
}

function loggedIn(username,password){

  let loggedInPromise = new Promise((resolve,reject)=>{
    var hashPass = acess_token.getHashToken(password);
    users.findOne({"username":username,"password":hashPass},function(err,result){
      if(result){
          users.findByIdAndUpdate(result._id,{"loggedIn":true},{new: true},(err, todo) => {
            // Handle any possible database errors
            if (err){
              reject(new Error(err.message));
            }
            else{
              let jwtToken = acess_token.getJwtToken(result._id);
              let obj = {"token":jwtToken,"username":result.username,"nickname":result.nickname};
              resolve(obj);
            }
          });
          //loggedPromise.resolve(jwtToken);
        }
        else if(err){
          reject(new Error(err.message));
        }
        else{
          reject(new Error("Invalid user with wrong password or username."));
        }

    });
  });


  return loggedInPromise;
}

function loggedOut(authUserId){
  let loggedOutPromise = new Promise((resolve,reject)=>{
    users.findOne({"_id":authUserId,"loggedIn":true},function(err,result){
      if(result){
        users.findByIdAndUpdate(authUserId,{"loggedIn":false},{new: true},(err, todo) => {
          // Handle any possible database errors
          if (err){
            reject(new Error(err.message));
          }
          else{
            resolve(true);
          }

        });
      }
      else{
        reject(new Error("User already logged out or not found!"));
      }
    });

  });

  return loggedOutPromise;
}

module.exports = logged_user;
