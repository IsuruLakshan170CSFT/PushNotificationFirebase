
import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/user.service';
import * as uuid from "uuid";
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  title = 'af-notification';
  message:any = null;
  currentTokenSave?:String="";
  browserName?:String="";
   myId = uuid;
   isHiddenLogin?:boolean=false;
   isHiddenLogout?:boolean=true;
   isHiddenProgress?:boolean=true;
   userName?:String="";
  constructor(private service:UserService , private deviceService: DeviceDetectorService) {}
  ngOnInit(): void {
    console.log(this.myId);
    this.getBrowserName();
   this.requestPermission();
   this.listen();
  }


  getBrowserName() { 
    this.browserName=this.deviceService.browser;
    console.log(this.deviceService.browser);
   // return this.deviceService.browser;
  }

  requestPermission() {
    const messaging = getMessaging();
    console.log("message : >>"+messaging);
    getToken(messaging,
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("we got the token.....");
        //   console.log(currentToken);
           this.currentTokenSave =currentToken;
           console.log(this.currentTokenSave);
         //  this.OnSaveToken();
         } else {
           console.log('No registration token available.Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }

 userData(){
  let data={
    user:this.userName,
    device:[
      { deviceId:this.browserName, deviceName:this.browserName , deviceToken: this.currentTokenSave}
    ],
   }
   return data;
 }

  OnSaveToken(){
    this.isHiddenLogin=true;
    this.isHiddenProgress=false;
    this.getBrowserName();
    console.log(this.myId);
    console.log(this.currentTokenSave);
    this.service.postUser(this.userData())
    .subscribe(data => {
    	console.log(data);
      this.isHiddenProgress=true;
      this.isHiddenLogout=false;
    });
   
   
  }

  OnRemoveToken(){
    this.isHiddenLogout=true;
    this.isHiddenProgress=false;
    this.service.postRemoveUser(this.userData())
    .subscribe(data => {
    	console.log(data);
       this.isHiddenProgress=true;
      this.isHiddenLogin=false;
    });
   
 
  }


}
