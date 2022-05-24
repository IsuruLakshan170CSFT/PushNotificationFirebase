'use strict';

import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';

import { mongoose } from 'mongoose';
import { DBUrl } from './config.js';
import  {UserModel}  from './models/user.js';
//import  {sendNotifications,notifications}  from './firebaseHandler.js';
import http from 'https';

const authHeader ='key=AAAAHwhqxaw:APA91bGLH_ceCg20S-psBpysf974Yam1mGb0pGxEPIfX_Q_TgjihG4p_j513rD46CCAMzP9e0bemJFJMhKf3TDMwcsL-ws2PJySrf9RN8q9mm_ShzkcK3cBJsXx0A2LDT8BEvruUMs_j';

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

 mongoose.connect(DBUrl,{useNewUrlParser:true});



//add a user changed
app.post('/addOne', async (req, res) => {
//  sendNotifications();
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
//send firebase notifications
app.post('/send', async (req, res) => {
  // res.send("success");
    notifications (req);
})

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


//get one user
// Find a single User with an id
app.get("/getOne", async (req, res) => {
  try {
      const user = await UserModel.findById(req.params.id);
      console.log(user);
      res.status(200).json(user);
  } catch(error) {
      res.status(404).json({ message: error.message});
  }
});


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
       resolve('success');
      console.log("resolve test");
    });
    
    req.on('error', (e) => {
        reject(e.message);
    });
    
    console.log(requestBody.body.token);
    console.log(requestBody.body.token);
    const reqBody = '{"registration_ids": [ '+ requestBody.body.token + ' ], "priority": "high", "notification": {"title": "'+ requestBody.body.title + '", "body": " '+ requestBody.body.body + ' "}}';
    
    req.write(reqBody);
    console.log(reqBody);
    req.end();
 });


}




export const apiData = serverless(app);