
import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { UserService } from './shared/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[UserService]
})
export class AppComponent implements OnInit {
title = 'af-notification';
  message:any = null;
  currentTokenSave :any=null;
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
           console.log(currentToken);
           this.currentTokenSave =currentToken;
          // this.OnSaveToken();
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
    let data={
     user:"nuwan",
     token:this.currentTokenSave,
    }
    this.service.postUser(data)
    .subscribe(data => {
    	console.log(data)
    });
  }


      

}
