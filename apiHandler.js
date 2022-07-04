'use strict';

import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const uri ="mongodb+srv://StDB:lrJKqTsc8nNSgoIP@cluster0.izid3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName="myFirstDatabase";
const userCollection="users";
const notificationCollection="notifications"
const client = new MongoClient(uri);
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 async function run(functionName,req,res) {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");
    const response = await switchFunction(client,functionName,req,res);
    return response
  } finally {
    await client.close();
  }
  }

  //get all  users api
  app.get("/getAllUsers", async (req, res) => {
    try {     
    const functionName="getAllUsers";
    const result = await run(functionName,req,res);
    if(!result)throw Error("Some thing worng");
    console.log(result);
    res.send(result);
    } catch (error) {
    res.status(400).json({msg:err});
    }
    }
  );

  //get all notification api
  app.get("/getAllNotifications", async (req, res) => {
    try {     
    const functionName="getAllNotifications";
    const result = await run(functionName,req,res);
    if(!result)throw Error("Some thing worng");
    console.log(result);
    res.send(result);
    } catch (error) {
    res.status(400).json({msg:err});
    }
    }
  );
//add notifications
app.post("/addNotification", async (req, res) => {
   
  try {     
    const functionName="addNotification";
    const result = await run(functionName,req,res);
    if(!result)throw Error("Some thing worng");
    console.log(result);
    res.send(result);
    } catch (error) {
    res.status(400).json({msg:err});
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
    else if(functionName == "getAllUsers"){
      const result=await getAllUsers(client,req,res);
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
  async function getAllUsers(clients,req,res) {
  
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
      const data ={
        title: req.body.title,
        body: req.body.body,
        sendBy:req.body.sendBy,
        sendFor:req.body.sendFor,
      }
  
      try{
        const result = await clients.db(dbName).collection(notificationCollection).insertOne(data);
        return "add new notification content";

      }catch{

      }      
   
    }
   
  //add or update user 
 async function addUser(clients,req,res) {
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
        //add new user
        if(findUser == null){
          const post = await clients.db(dbName).collection(userCollection).insertOne(data);
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
 
export const apiData = serverless(app); 