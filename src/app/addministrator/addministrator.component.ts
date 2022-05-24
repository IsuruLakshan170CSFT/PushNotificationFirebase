import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {User,UserToken} from 'src/app/shared/assets';
import { ThisReceiver } from '@angular/compiler';
import { FormGroup,FormControl } from '@angular/forms';


@Component({
  selector: 'app-addministrator',
  templateUrl: './addministrator.component.html',
  styleUrls: ['./addministrator.component.scss']
})
export class AddministratorComponent implements OnInit {

  listOfUsers: User[]=[];
  selectedlistOfUsers: any[]=[];
  selectedUsersToken:UserToken[]=[];

  notificationTitle?:String="";
  notificationBody?:String="";
  notificationToken?:String="";
 
  finalToken?:String="";
  testToken?:String="";

  constructor(private service:UserService) {}

  ngOnInit(): void {
    this.GetAllUsers();
    
  }


GetAllUsers(){
  this.service.getUser()
  .subscribe
  (
    data=>{

      for(var i = 0; i < data.length ; i++){
        this.listOfUsers.push(data[i]);
        }
    }
  );
}

  AddToken(){
    console.log(' "check" ');
  
    for(var i = 0; i < this.selectedlistOfUsers.length ; i++){
      this.selectedUsersToken.push(this.selectedlistOfUsers[i].token);
      this.testToken = '"'+this.selectedlistOfUsers[i].token+'"' ;
      
    if(i ==0){
      this.finalToken =  ''+ this.testToken +'';
    }
     else{
      this.finalToken =  ''+ this.finalToken +','+ this.testToken +'';
    } 
  }
  }


  OnSendNotification(){
    this.AddToken();
 
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

}
