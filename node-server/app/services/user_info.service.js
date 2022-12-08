//var mongoose = require('mongoose');
//var Q = require('q');
const Promise = require('promise');
const users = require('../model/user_info.model');
const service_user = {};
const acess_token = require('./acess_token.service');
const mongoose = require('mongoose');

service_user.getListUser = getListUser;
service_user.getInfoById = getInfoById;
service_user.createUser = createUser;
service_user.updateUser = updateUser;
service_user.deleteUser = deleteUser;



function getListUser(callerId){
 let userListPromise = new Promise((resolve,reject)=>{
   //let regex = new RegExp(callerId);
   users.find({"_id":{$ne:callerId}},function(err,result){
     if(err){
       reject(new Error(err.message));
     }
     else if(!result){
       reject(new Error("User not Found!"));
     }
     else{
       resolve(result.map((doc)=>{
         return {"_id":doc._id,"username":doc.username,"nickname":doc.nickname,"createdBy":doc.createdBy,"createdOn":doc.onCreated};
       }));
     }
    });
 });

 return userListPromise;
}



function getInfoById(callerId,userId){
  let userByIdPromise = new Promise((resolve,reject)=>{
    userId = mongoose.Types.ObjectId(userId);
    if(callerId != userId ){
      users.find({"_id":userId},function(err,result){
        if(err){
          reject(new Error(err.message));
        }
        else if(!result){
          reject(new Error("User not Found!"));
        }
        else{
          resolve(result.map((doc)=>{
            return {"username":doc.username,"nickname":doc.nickname,"createdBy":doc.createdBy,"createdOn":doc.onCreated};
          }));
        }
       });
    }
    else{
      reject(new Error("Not allow to get info of own profile."))
    }

  });

  return userByIdPromise;
}


function createUser(callerId,data){
  let createUserPromise = new Promise((resolve,reject)=>{
    users.findOne({"username":data.username},function(err,result){
      if(!result){
        let hashPass = acess_token.getHashToken(data.password);
        data.password = hashPass;
        data["createdBy"] = callerId;

        let createUser = new users(data);
        createUser.save(err => {
          if (err) {
            reject(new Error(err.message));
          }
          else{
            resolve({"_id":createUser._id,"username":createUser.username,"nickname":createUser.nickname,"onCreated":createUser.onCreated,"createdBy":createUser.createdBy});
          }
        });
      }else{
        reject(new Error("User already exist!"));
      }
    });
  });

  //console.log("promise",registerPromise);
  return createUserPromise;
}



function updateUser(callerId,userId,data){
  let updateUserPromise = new Promise((resolve,reject)=>{
    userId = mongoose.Types.ObjectId(userId);
    if(callerId != userId){
      users.findByIdAndUpdate(userId,data,{new: true},(err, result) => {
        // Handle any possible database errors
        if (err){
          reject(new Error(err.message));
        }
        else{
          resolve({"username":result.username,"nickname":result.nickname,"onCreated":result.onCreated,"createdBy":result.createdBy});
        }
      });
    }
    else{
      reject(new Error("Not allow to update own profile."))
    }

  });

  return updateUserPromise;
}


function deleteUser(callerId,userId){
  let deleteUserPromise = new Promise((resolve,reject)=>{
    userId = mongoose.Types.ObjectId(userId);
    if(callerId != userId){
      users.remove({"_id":userId},(err, result) => {
        // Handle any possible database errors
        if (err){
          reject(new Error(err.message));
        }
        else{
          resolve({"deleted":true,"data":result.result});
        }
      });
    }
    else{
      reject(new Error("Not allow to delete own profile."))
    }

  });

  return deleteUserPromise;
}

module.exports = service_user;
