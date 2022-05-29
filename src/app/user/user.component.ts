
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
   myId = uuid.v4();

  constructor(private service:UserService , private deviceService: DeviceDetectorService) {}
  ngOnInit(): void {
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

  OnSaveToken(){
    this.getBrowserName();
    console.log(this.myId);
    console.log(this.currentTokenSave);
    let data={
     user:"hasitha",
     device:[
       { deviceId:this.myId , deviceName:this.browserName , deviceToken: this.currentTokenSave}
     ],
    }
    this.service.postUsertest(data)
    .subscribe(data => {
    	console.log(data)
    });
  }

  OnRemoveToken(){
    let data={
      user:"pawan",
      device:[
        { deviceId:this.myId , deviceName:this.browserName , deviceToken: this.currentTokenSave}
      ],
     }
    this.service.postRemoveUsertest(data)
    .subscribe(data => {
    	console.log(data)
    });
  }


}
