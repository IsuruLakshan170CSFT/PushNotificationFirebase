import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {UserToken,UserModel} from 'src/app/shared/assets';
import * as uuid from "uuid";

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

  constructor(private service:UserService) {}

  ngOnInit(): void {
    const myId = uuid.v4();

    console.log(myId);
    this. GetAllUsersWithDevices();


    
  }

  OnSendNotification(){
    this.addToken();
 
    let data={

     token: this.finalToken,
     title:this.notificationTitle,
     body:this.notificationBody

    }
    this.service.postNotification(data)
    .subscribe(data => {

    });

    this.notificationToken='';

    
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
