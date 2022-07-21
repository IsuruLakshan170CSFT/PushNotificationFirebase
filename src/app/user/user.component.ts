
import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { UserService } from '../notification-services/user.service';
import * as uuid from "uuid";
import { DeviceDetectorService } from 'ngx-device-detector';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
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

  constructor(private service:UserService , private deviceService: DeviceDetectorService,private messageService: MessageService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    console.log(this.myId);
    this.getBrowserName();
   this.requestPermission();
   this.listen();
  }

  showLogin() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully login'});
  }
  showLogout() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully logout'});
  }
 
  getBrowserName() { 
    this.browserName=this.deviceService.browser;
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           this.currentTokenSave =currentToken;
           console.log(this.currentTokenSave);
         } else {
         //  console.log('No registration token available.Request permission to generate one.');
         }
     }).catch((err) => {
       // console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.message=payload;
    });
  }

 userData(){
  let data={
    user:this.userName,
    devices:[
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
      this.showLogin();
      this.isHiddenProgress=true;
      this.isHiddenLogout=false;
    });
   
  }

  OnRemoveToken(){
    this.isHiddenLogout=true;
    this.isHiddenProgress=false;
    this.service.postRemoveUser(this.userData())
    .subscribe(data => {
       this.showLogout();
       this.isHiddenProgress=true;
       this.isHiddenLogin=false;
    });
   
 
  }


}
