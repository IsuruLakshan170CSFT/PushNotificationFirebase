'use strict';

import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import http from 'https';
import {authHeader,dbName,userCollection,notificationCollection } from './config.js';
import { run} from './dbConnect.js' ;
import dateFormat, { masks } from "dateformat";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

    //get all  users array length
    app.get("/getAllUsersLength", async (req, res) => {

  
      try {     
      const functionName="getAllUsersLength";
      const result = await run(functionName,req,res);
      if(!result)throw Error("Some thing worng");
      const resultLength=result.length;
      res.status(200).json({length:resultLength});
      } catch (error) {
      res.status(400).json({msg:err});
      }
      }
    );

    // getAllNotificationsQuery query
    app.get("/getAllNotificationsQuery", async (req, res) => {

      try{
        const functionName="getAllNotificationsQuery";
        const result = await run(functionName,req,res);
        if(result !="error"){
          res.send(result);
        }
        else{
          res.status(400).json({msg:"error"});
        }

      }
      catch(error){
        res.status(400).json({msg:"error"});
      }
    })

 // getAllUsers query
 app.get("/getAllUsersQuery", async (req, res) => {

  try{
    const functionName="getAllUsersQuery";
    const result = await run(functionName,req,res);
    if(result !="error"){
      res.send(result);
    }
    else{
      res.status(400).json({msg:"error"});
    }

  }
  catch(error){
    res.status(400).json({msg:"error"});
  }
})

  //get all notification list
  app.get("/getAllNotificationsList", async (req, res) => {

    try {     
    const functionName="getAllNotifications";
    const result = await run(functionName,req,res);
    if(!result)throw Error("Some thing worng");
    res.send(result);
    } catch (error) {
    res.status(400).json({msg:err});
    }
    }
  );

  //get all notification array length
  app.get("/getAllNotificationsLength", async (req, res) => {
    try {     
    const functionName="getAllNotifications";
    const result = await run(functionName,req,res);
    if(!result)throw Error("Some thing worng");
    const resultLength=result.length;
    res.status(200).json({length:resultLength});
    } catch (error) {
    res.status(400).json({msg:error});
    }
    }
  );
//add notifications
app.post("/addNotification", async (req, res) => {

 // console.log(req.body.title);
   
  try {     
    var result="";
    const functionName="addNotification";
    // const saveResult = await run(functionName,req,res);
    // result=saveResult;
     const notificationResult = await sendNotification(req)
    if(notificationResult == "True" && req.body.isSave == true){
     const saveResult = await run(functionName,req,res);
     result=saveResult;
    }
    else{
      result =notificationResult;
     }

    if(!result)throw Error("Some thing worng");
    console.log(result);
    res.status(200).json({message:"success : "});
    } catch (error) {
    res.status(400).json({msg:"err"});
    }
    }
)

//add or update user
app.post("/addUser", async (req, res) => {
   
  try {     
    const functionName="addUser";
    const result = await run(functionName,req,res);
    if(!result)throw Error("Some thing worng");
    console.log(result);
    res.status(200).json({message:"suceess : "});
    } catch (error) {
    res.status(400).json({msg:"err"});
    }
    }
)

//delete user
app.post("/deleteUser", async (req, res) => {
   
  try {     
    const functionName="deleteUser";
    const result = await run(functionName,req,res);
    if(!result)throw Error("Some thing worng");
    console.log(result);
    res.status(200).json({message:"successfully deleted : "});
    } catch (error) {
    res.status(400).json({msg:err});
    }
    }
)
  //swich functions
 async function switchFunction(client,functionName,req,res) {

    if(functionName == "getAllNotifications"){
      const result=await getAllNotifications(client,req,res);
      return  result;
    }
    else if(functionName == "getAllUsersLength"){
      const result=await getAllUsersLength(client,req,res);
      return  result;
    }
    else if(functionName == "addNotification"){
      const result=await addNotification(client,req,res);

      return  result;
    }
    else if(functionName == "addUser"){
      const result=await addUser(client,req,res);
      return  result;
    }
    else if(functionName == "deleteUser"){
      const result=await deleteUser(client,req,res);
      return  result;
    }

    else if(functionName == "getAllNotificationsQuery"){
      const result=await getAllNotificationsQuery(client,req,res);
      return  result;
    }
    else if(functionName == "getAllUsersQuery"){
      const result=await getAllUsersQuery(client,req,res);
      return  result;
    }
    
  }

  //get all notifications
  async function getAllNotifications(clients,req,res) {
  
    const result = await clients.db(dbName).collection(notificationCollection).find({}).toArray();
    if (result) {

        const results=result;
        return results;
    } else {
        console.log(`Empty list`);
    }
  }

  //get all users
  async function getAllUsersLength(clients,req,res) {
  
    const result = await clients.db(dbName).collection(userCollection).find({}).toArray();
    if (result) {
        const results=result;
        return results;
    } else {
        console.log(`Empty list`);
    }
  }
 
    //post notification
  async function addNotification(clients,req,res) {
    
     var currentDateTime = new Date();
     currentDateTime = dateFormat(currentDateTime, "isoDateTime");
    
      const data ={
        title: req.body.title,
        body: req.body.body,
        sendBy:req.body.sendBy,
        sendFor:req.body.sendFor,
        time:currentDateTime
      }
  
      try{
        const result = await clients.db(dbName).collection(notificationCollection).insertOne(data);
        return "add new notification content";

      }catch{

      }      
   
    }
   
  //add or update user 
 async function addUser(client,req,res) {
  console.log("Inside add user");
  console.log(req.body.user);
  console.log(req.body.device[0].deviceId);
  console.log(req.body.device[0].deviceName);
  console.log(req.body.device[0].deviceToken);
      const data ={
        user: req.body.user,
        device:[
          { deviceId:req.body.device[0].deviceId, 
            deviceName:req.body.device[0].deviceName,
            deviceToken: req.body.device[0].deviceToken}
        ],
       }
       console.log("data");
       console.log(data);
      
  
       try {
        const deviceData =data.device;
        const findUser = await client.db(dbName).collection(userCollection).findOne({user:data.user});
        //add new user
        if(findUser == null){
          const post = await client.db(dbName).collection(userCollection).insertOne(data);
          return post;

        }
        //update exising user
        else{
          //update existing User 
          //check device is existing or not
          const query = { user: data.user, "device.deviceId": deviceData[0].deviceId };
          const findUserDevice = await client.db(dbName).collection(userCollection).findOne(query);
      //    console.log(findUserDevice);
          if(findUserDevice){
            //update existing device token
            const updateDocument = {
              $set: { "device.$.deviceToken": deviceData[0].deviceToken }
            };
            const result = await client.db(dbName).collection(userCollection).updateOne(query, updateDocument);
            console.log("updated existing device in existing user");
            return "updated existing device in existing user";
          }
          else{
    
         //add new device to exitsting user
         try { 
         // console.log(req.body.user);
        
          const allExistingDevices =findUser.device;
          const deviceCount =Object.keys(allExistingDevices).length;
        
          const newConvertedDevices = new Array ;
          for(let i = 0 ;i< deviceCount;i++){
            const newDevice=  {
              deviceId: allExistingDevices[i].deviceId ,
              deviceName: allExistingDevices[i].deviceName,
              deviceToken:allExistingDevices[i].deviceToken,
             
            };
          newConvertedDevices.push(newDevice);
          }
          const newDevice=  {
            deviceId: deviceData[0].deviceId ,
            deviceName: deviceData[0].deviceName,
            deviceToken:deviceData[0].deviceToken,
          };
      
          newConvertedDevices.push(newDevice);
          var allDevString="";
          for(let i = 0 ; i < newConvertedDevices.length;i++){
            const tempSting=  "{ " + ' "deviceId" ' +": " +  '"' + newConvertedDevices[i].deviceId + '"'  +"," +' "deviceName" '+ " : " + '"' + newConvertedDevices[i].deviceName +'"'  + "," + ' "deviceToken" ' +":" +'"' +newConvertedDevices[i].deviceToken + '"'  + " }" ; 
            if(i == 0){
              allDevString = tempSting;
            }
            else{
              allDevString = allDevString + "," + tempSting;
            } 
          }
            const newDevicescreate =  "{ " + ' "device" ' +": [ "+ allDevString + "] }" ;
        const obj = JSON.parse(newDevicescreate);
      //  console.log( obj);
    //  const result = await client.db(dbName).collection("users").updateOne(query, obj);

        const post = await client.db(dbName).collection(userCollection).findOneAndUpdate({user:findUser.user},{$set:obj});
        console.log( post);
   
       return "updated";
        }
         catch (error) {
         // response.status(400).json({msg:"err"});
          return "error"
        }
          }
        }

      } 
      catch (error) {
          response.status(400).json({msg:"error"});
          return "error"
      }
   }
 
async function deleteUser(client,req,res) {
  const data ={
    user: req.body.user,
    device:[
      { deviceId:req.body.device[0].deviceId, 
        deviceName:req.body.device[0].deviceName,
        deviceToken: req.body.device[0].deviceToken}
    ],
   }
  try {
    const deviceData =data.device;
    const findUser = await client.db(dbName).collection(userCollection).findOne({user:data.user});
    //user is not in database
    if(findUser == null){
   
        return "This user is not exist"
    }
    //if user exist in database
    else{
      //update existing User 
      //check device is existing or not
      const query = { user: data.user, "device.deviceId": deviceData[0].deviceId };
      const findUserDevice = await client.db(dbName).collection(userCollection).findOne(query);

      if(findUserDevice){
        //update existing device token
        try { 
        
          const allExistingDevices =findUser.device;
          const deviceCount =Object.keys(allExistingDevices).length;
        
          const newConvertedDevices = new Array ;
          for(let i = 0 ;i< deviceCount;i++){
                
            if(allExistingDevices[i].deviceId != data.device[0].deviceId ){    
              const newDevice=  {
                deviceId: allExistingDevices[i].deviceId ,
                deviceName: allExistingDevices[i].deviceName,
                deviceToken:allExistingDevices[i].deviceToken,            
              };
              newConvertedDevices.push(newDevice);
            }               
          }
          var allDevString="";
          for(let i = 0 ; i < newConvertedDevices.length;i++){
            const tempSting=  "{ " + ' "deviceId" ' +": " +  '"' + newConvertedDevices[i].deviceId + '"'  +"," +' "deviceName" '+ " : " + '"' + newConvertedDevices[i].deviceName +'"'  + "," + ' "deviceToken" ' +":" +'"' +newConvertedDevices[i].deviceToken + '"'  + " }" ; 
            if(i == 0){
              allDevString = tempSting;
            }
            else{
              allDevString = allDevString + "," + tempSting;
            } 
          }
            const newDevicescreate =  "{ " + ' "device" ' +": [ "+ allDevString + "] }" ;
        const obj = JSON.parse(newDevicescreate);
      //  console.log( obj);
      const post = await client.db(dbName).collection(userCollection).findOneAndUpdate({user:findUser.user},{$set:obj});
    
       return "remove a device in existing user";

        } catch (error) {
          response.status(400).json({msg:"err"});
        } 
      }
      else{
   
     return "Erro This device is not in this user";
      }
    }

  } catch (error) {
      response.status(400).json({msg:"error"});
  }




 }

 //send firebase notifications
 async function sendNotification(reqData ) {
  console.log("send notification data");
 // console.log(reqData);
   
  let data ={
    title:reqData.body.title,
    body: reqData.body.body,
    token:reqData.body.token
  }

  return new Promise((resolve, reject) => {
    const options = {
        host: "fcm.googleapis.com",
        path: "/fcm/send",
        method: 'POST',
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
        }
    };
    
    const req = http.request(options, (res) => {
       resolve('True');
       console.log("resolve test");
       
    });
    
    req.on('error', (e) => {
        reject(e.message);
    });
    
    const reqBody = '{"registration_ids": [ '+ data.token + ' ], "priority": "high", "notification": {"title": "'+ data.title + '", "body": " '+ data.body + ' "}}';
    
    req.write(reqBody);
    console.log("reqBody");
    console.log(reqBody);
    req.end();
 });
 }

   //get all notifications query
  async function getAllNotificationsQuery(clients,req,res) {

    let numberOfRows= parseInt(req.query.rows);
    let currentItemCount =parseInt(req.query.first);
    let sortField= req.query.sortField;
    let sortOrder= req.query.sortOrder;
    let filterTitle= req.query.filterTitle;
    let filterBody= req.query.filterBody;
    let filterSendBy= req.query.filterSendBy;
    let filterSendFor= req.query.filterSendFor;
    let filterTime= req.query.filterTime;

    console.log(filterTitle);

  
   try{
   
  var result =[];

    if(sortField == "title"){

      result = await clients.db(dbName).collection(notificationCollection)
      .find(
        {title:{$regex : filterTitle ,$options:"i"},
        body:{$regex : filterBody ,$options:"i"},
        sendBy:{$regex : filterSendBy ,$options:"i"},
        sendFor:{$regex : filterSendFor ,$options:"i"},
        time:{$regex : filterTime ,$options:"i"}
      })
      .sort({title: sortOrder})
      .skip(currentItemCount)
      .limit(numberOfRows)
      .toArray();

    }
   else if(sortField == "body"){
    result = await clients.db(dbName).collection(notificationCollection)
    .find(
      {title:{$regex : filterTitle ,$options:"i"},
      body:{$regex : filterBody ,$options:"i"},
      sendBy:{$regex : filterSendBy ,$options:"i"},
      sendFor:{$regex : filterSendFor ,$options:"i"},
      time:{$regex : filterTime ,$options:"i"}
    })
    .sort({body: sortOrder})
    .skip(currentItemCount)
    .limit(numberOfRows)
    .toArray();

    }
    else  if(sortField == "sendBy"){
      result = await clients.db(dbName).collection(notificationCollection)
      .find(
        {title:{$regex : filterTitle ,$options:"i"},
        body:{$regex : filterBody ,$options:"i"},
        sendBy:{$regex : filterSendBy ,$options:"i"},
        sendFor:{$regex : filterSendFor ,$options:"i"},
        time:{$regex : filterTime ,$options:"i"}
      })
      .sort({sendBy: sortOrder})
      .skip(currentItemCount)
      .limit(numberOfRows)
      .toArray();

    }
    else if(sortField == "sendFor"){
      result = await clients.db(dbName).collection(notificationCollection)
      .find(
        {title:{$regex : filterTitle ,$options:"i"},
        body:{$regex : filterBody ,$options:"i"},
        sendBy:{$regex : filterSendBy ,$options:"i"},
        sendFor:{$regex : filterSendFor ,$options:"i"},
        time:{$regex : filterTime ,$options:"i"}
      })
      .sort({sendFor: sortOrder})
      .skip(currentItemCount)
      .limit(numberOfRows)
      .toArray();

    }
    else if(sortField == "time"){
      result = await clients.db(dbName).collection(notificationCollection)
      .find(
        {title:{$regex : filterTitle ,$options:"i"},
        body:{$regex : filterBody ,$options:"i"},
        sendBy:{$regex : filterSendBy ,$options:"i"},
        sendFor:{$regex : filterSendFor ,$options:"i"},
        time:{$regex : filterTime ,$options:"i"}
      })
      .sort({time: sortOrder})
      .skip(currentItemCount)
      .limit(numberOfRows)
      .toArray();

    }

    console.log(result.length);
    return result;
    
    }
      
          
  catch(error)
  {
    res.status(400).json({msg:"err"});
  } 

  }

   //get all users query
async function getAllUsersQuery(clients,req,res) {

    let numberOfRows= parseInt(req.query.rows);
    let currentItemCount =parseInt(req.query.first);
    let sortField= req.query.sortField;
    let sortOrder= req.query.sortOrder;
    let filterUser= req.query.filterUser;
    let filterDeviceName= req.query.filterDeviceName;

   try{
   
    var result =[];

    if(sortField == "user"){
      console.log("User");
      console.log(filterDeviceName);

      result = await clients.db(dbName).collection(userCollection)
      .find(
        {"user":{$regex : filterUser ,$options:"i"},
         "device.deviceName":{$regex : filterDeviceName ,$options:"i"}
        
      })
      .sort({user: sortOrder})
      .skip(currentItemCount)
      .limit(numberOfRows)
      .toArray();

    }
    else if(sortField == "deviceName"){
      result = await clients.db(dbName).collection(userCollection)
      .find(
        {user:{$regex : filterUser ,$options:"i"},
        "device.deviceName":{$regex : filterDeviceName ,$options:"i"}
      })
      .sort({"device.deviceName": sortOrder})
      .skip(currentItemCount)
      .limit(numberOfRows)
      .toArray();
    }

      
    return result;
 
   }
   catch(error){
    res.status(400).json({msg:error});
   }
  }

export const apiData = serverless(app); 

export {switchFunction}