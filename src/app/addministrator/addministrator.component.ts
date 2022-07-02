import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {UserToken,UserModel} from 'src/app/shared/assets';
import * as uuid from "uuid";
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-addministrator',
  templateUrl: './addministrator.component.html',
  styleUrls: ['./addministrator.component.scss']
})
export class AddministratorComponent implements OnInit {

  listOfAllUsers: UserModel[]=[];
  selectedlistOfUsers: any[]=[];
  selectedUsersToken:UserToken[]=[];

  notificationTitle?:String="";
  notificationBody?:String="";
  notificationToken?:String="";
 
  finalToken?:String="";
  testToken?:String="";
  isHiddenProgress?:boolean=true;
  value: boolean=false;
  isHide: boolean=false;
  constructor(private service:UserService,private router: Router) {}

  ngOnInit(): void {
    const myId = uuid.v4();
    console.log(myId);
    this. GetAllUsersWithDevices();

  }
  viewNotifications(){
    this.router.navigateByUrl('/notifications');
    }
  OnSendNotification(){
    this.showSuccess();
    this.isHide=true;
    this.isHiddenProgress=false;
    this.addToken();
 
    let data={
      isSave:this.value,
      token: this.finalToken,
      title:this.notificationTitle,
      body:this.notificationBody
    }
    this.service.postNotification(data)
    .subscribe(data => {
      console.log(data.status)
      console.log(data.message)
      this.isHiddenProgress=true;
      this.isHide=false;
    });

    this.notificationToken='';

    
  }
  showSuccess() {
}

  //new updates

  GetAllUsersWithDevices(){
    this.service.getAllUsers()
    .subscribe
    (
      data=>{
        console.log(data);
        for(var i = 0; i < data.length ; i++){
          this.listOfAllUsers.push(data[i]);
          }
        console.log(this.listOfAllUsers.length);
      }
    );
  }

  addToken(){

    for(var i = 0; i < this.selectedlistOfUsers.length ; i++){
        
      for( let j=0;j < this.selectedlistOfUsers[i].device.length ;j++){

       this.testToken = '"'+this.selectedlistOfUsers[i].device[j].deviceToken+'"' ;

       if(i == 0 && j == 0){
         this.finalToken =  ''+ this.testToken +'';
       }
        else{
         this.finalToken =  ''+ this.finalToken +','+ this.testToken +'';
       } 
      }
  }
  console.log(this.finalToken);
  }

}
