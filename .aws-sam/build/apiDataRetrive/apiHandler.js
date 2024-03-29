'use strict';

import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';

import { mongoose } from 'mongoose';
//import { DBUrl } from './config.js';
import  {User}  from './models/user.js';
import  {Notification}  from './models/notification.js';
import http from 'https';


const DBUrl="mongodb+srv://StDB:lrJKqTsc8nNSgoIP@cluster0.izid3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const authHeader ='key=AAAAHwhqxaw:APA91bGLH_ceCg20S-psBpysf974Yam1mGb0pGxEPIfX_Q_TgjihG4p_j513rD46CCAMzP9e0bemJFJMhKf3TDMwcsL-ws2PJySrf9RN8q9mm_ShzkcK3cBJsXx0A2LDT8BEvruUMs_j';

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 mongoose.connect(DBUrl,{useNewUrlParser:true});

/*
//add or update user 
app.post('/addOne', async (req, res) => {
  console.log( "user body : "+req.body.user);
  const currentUser = await UserModel.findOne({ user: req.body.user});

if(currentUser){
  const updateUser = await UserModel.updateOne({user: currentUser.user}, {$set:{token:req.body.token}});
  const responseData={
   "response": "Updated the User"
  }
  res.send(responseData);
}
else{
  const user=new UserModel(req.body);
  await user.save();
  const responseData={
    "response": "Add new User"
   }
   res.send(responseData);
}
});
*/
//send firebase notifications
app.post('/send', async (req, res) => {
  try {     
    const sendNotifications = await  notifications(req);
      console.log("Details send : "+ sendNotifications)
    //  res.send(sendNotifications);
     if(req.body.isSave && sendNotifications == "True"){
        console.log("save Notifications:")
        const saveNotificationsResponse  = await  saveNotifications(req)
        console.log("Details save : "+ saveNotificationsResponse)
        res.status(200).json({status:"True",message:"save and send"});
       }
       else{
        res.status(200).json({status:"True",message:"only send"});
      }
   //  res.status(200).json({msg:"True"});
    } 
    catch (error) {
    res.status(400).json({msg:err});
    }
})

/*
//get all users
app.get("/getAll", async (req, res) => {
  try {  
    
  const getUsers = await UserModel.find({});
  if(!getUsers)throw Error("Some thing worng");
  console.log(getUsers);
  res.send(getUsers);
  } catch (error) {
  res.status(400).json({msg:err});
  }
  }
);
*/
async function notifications (requestBody){

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
    
    const reqBody = '{"registration_ids": [ '+ requestBody.body.token + ' ], "priority": "high", "notification": {"title": "'+ requestBody.body.title + '", "body": " '+ requestBody.body.body + ' "}}';
    
    req.write(reqBody);
    console.log("reqBody");
    console.log(reqBody);
    req.end();
 });
}
async function saveNotifications (request){
  try {
    console.log("IS SAVE function")
    const post = new Notification(request.body);
    if(post == null)throw Error("Empty body!");
    await post.save();
  //  console.log("add new Notification")
   return "saved"
  }
  catch (error) {
   return   response.status(400).json({msg:"err"});
   }
  }
    

//add notifications
app.post("/add_notification", async (request, response) => {
   
  try {
    const post = new Notification(request.body);
    if(post == null)throw Error("Empty body!");
    await post.save();
    console.log("add new Notification")
    response.status(200).json({message:"add new Notification "});
  }
  catch (error) {
    response.status(400).json({msg:"err"});
   }
  }
)
 
  //get all notifications 
  app.get("/getAllNotifications", async (req, res) => {
    try {     
    const getNotifications = await Notification.find({});
    if(!getNotifications)throw Error("Some thing worng");
    console.log(getNotifications);
    res.send(getNotifications);
    } catch (error) {
    res.status(400).json({msg:err});
    }
    }
  );


//new update
//add devices
app.post("/add_user", async (request, response) => {
   
  try {
    const deviceData =request.body.device;
    const findUser = await User.findOne({user:request.body.user});
    //add new user
    if(findUser ==null){
      const post = new User(request.body);
      if(post == null)throw Error("Some thing worng");
        await post.save();
        console.log("add new user")
        response.status(200).json({message:"add new user "});
    }
    //update exising user
    else{
      //update existing User 
      //check device is existing or not
      const query = { user: request.body.user, "device.deviceId": deviceData[0].deviceId };
      const findUserDevice = await User.findOne(query);
  //    console.log(findUserDevice);
      if(findUserDevice){
        //update existing device token
        const updateDocument = {
          $set: { "device.$.deviceToken": deviceData[0].deviceToken }
        };
        const result = await User.updateOne(query, updateDocument);
        console.log("updated existing device in existing user");
        response.status(200).json({success:"updated existing device in existing user"});
      }
      else{

     //add new device 
     try { 
      console.log(request.body.user);
    
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
    const post = await User.findByIdAndUpdate(findUser.id,obj);
 //  console.log( post);

   response.status(200).json({message:"add new device to existing user"});
 
    } catch (error) {
      response.status(400).json({msg:"err"});
    }
      }
    }
    const findUpdatedUser = await User.findOne({user:request.body.user});
    console.log(findUpdatedUser);
  } catch (error) {
      response.status(400).json({msg:"error"});
  }
});

//remove user
app.post("/delete", async (request, response) => {

  try {
    const deviceData =request.body.device;
    const findUser = await User.findOne({user:request.body.user});
    //add new user
    if(findUser ==null){
   
        console.log("This user is not exist")
        response.status(200).json({message:"This user is not exist"});
    }
    //update exising user
    else{
      //update existing User 
      //check device is existing or not
      const query = { user: request.body.user, "device.deviceId": deviceData[0].deviceId };
      const findUserDevice = await User.findOne(query);
  //    console.log(findUserDevice);
      if(findUserDevice){
        //update existing device token
        try { 
        
          const allExistingDevices =findUser.device;
          const deviceCount =Object.keys(allExistingDevices).length;
        
          const newConvertedDevices = new Array ;
          for(let i = 0 ;i< deviceCount;i++){
                
            if(allExistingDevices[i].deviceId != request.body.device[0].deviceId ){    
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
        const post = await User.findByIdAndUpdate(findUser.id,obj);
      //  console.log( post);
      
       response.status(200).json({message:"remove a device in existing user"});
      
        } catch (error) {
          response.status(400).json({msg:"err"});
        } 
      }
      else{
  
     //this device not in database  
     response.status(200).json({message:"Erro This device is not in this user"});
      }
    }
    const findUpdatedUser = await User.findOne({user:request.body.user});
    console.log(findUpdatedUser);
  } catch (error) {
      response.status(400).json({msg:"error"});
  }
  });
  
  //get all registered users
  app.get("/getAllUsers", async (req, res) => {
    try {     
    const getUsers = await User.find({});
    if(!getUsers)throw Error("Some thing worng");
    console.log(getUsers);
    res.send(getUsers);
   // res.status(200).json({getUsers});
    } catch (error) {
    res.status(400).json({msg:err});
    }
    }
  );
 
export const apiData = serverless(app); 