
import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
title = 'af-notification';
  message:any = null;
  currentTokenSave?:String="";
  constructor(private service:UserService) {}
  ngOnInit(): void {
  //  this.UserService.postUser("str");
   this.requestPermission();
   this.listen();
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
    console.log(this.currentTokenSave);
    let data={
     user:"Pavani",
     device:[
       { deviceId:"dev3" , deviceName:"FireFox" ,deviceToken: this.currentTokenSave}
     ],
    }
    this.service.postUsertest(data)
    .subscribe(data => {
    	console.log(data)
    });
  }

  OnRemoveToken(){
    let data={
     user:"kasun",
     device:[
       { deviceId:"dev1" , deviceName:"firefox" ,deviceToken:"22222"}
     ],
    }
    this.service.postRemoveUsertest(data)
    .subscribe(data => {
    	console.log(data)
    });
  }
}
