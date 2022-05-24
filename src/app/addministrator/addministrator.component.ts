import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import {User,UserToken} from 'src/app/shared/assets';
import { ThisReceiver } from '@angular/compiler';
import { FormGroup,FormControl } from '@angular/forms';
interface City {
  name: string,
  code: string
}

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
  allTokens?:String="test token";
  finalToken?:String="";
  testToken?:String="";

  constructor(private service:UserService) {}

  ngOnInit(): void {
    this.GetAllUsers();
    
  }

getUser(val: any){
  {console.log(val)}
}

GetAllUsers(){
  this.service.getUser()
  .subscribe
  (
    data=>{

      for(var i = 0; i < data.length ; i++){
        this.listOfUsers.push(data[i]);
        }
        console.log(this.listOfUsers.length);
        console.log(this.listOfUsers.length);
    }
  );
}

  OnGet(){
    console.log("listOfUsers :" +this.listOfUsers.length);
    console.log(this.selectedlistOfUsers.length);
    this.AddToken();
  }

  AddToken(){
    console.log(' "check" ');
  
    for(var i = 0; i < this.selectedlistOfUsers.length ; i++){
      this.selectedUsersToken.push(this.selectedlistOfUsers[i].token);
   //   this.allTokens = this.allTokens + this.selectedlistOfUsers[i].token;
      
        this.testToken = '"'+this.selectedlistOfUsers[i].token+'"' ;
      
    if(i ==0){
      this.finalToken =  ''+ this.testToken +'';
    } else{

      this.finalToken =  ''+ this.finalToken +','+ this.testToken +'';
    }
      
  
     
  }
      

   console.log(this.finalToken);
  }


  OnSendNotification(){
    this.AddToken();

    
    let data={
     //  token:' "elUGSBp6r5knt61N5wojTV:APA91bHaVeBRQD-jMQvQ2cWcdfXLjyMdW4wSPPEwco3FWq2H5nNWgNN5-pneIAxc0d2Jz72RmheOyRfG0M0JWfi8jXvhGIRBKu9JKbqRkmm_EkTEYij5YB662Pw_MyzRmdrQzC7bS5ND" , "fV929kmJewV4rIOB-iwxf9:APA91bHlsM6Da2c2X1-v7bjZRPyiih0RHbq9It7P92n45lpoluNpXGUA7XTJrgZsyqI0S2wT_xbvLymyzcrC-CkINawxKf3AJ3ynutgDzqVo3tulhgcxMAJWJzQzeX6SDBCrJ53fl8p3" ',

     token: this.finalToken,
     title:this.notificationTitle,
     body:this.notificationBody

    }
    this.service.postNotification(data)
    .subscribe(data => {
    	console.log(data)
    });
    console.log("send buttion clicked ");
    console.log(this.notificationBody);
    console.log(this.notificationTitle,);
    this.notificationToken='';

    
  }

}
