import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/notification-services/user.service';
import {UserModel} from 'src/app/notification-services/assets';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-addministrator',
  templateUrl: './addministrator.component.html',
  styleUrls: ['./addministrator.component.scss'],
  providers: [MessageService]
})

export class AddministratorComponent implements OnInit {

  listOfAllUsers: UserModel[]=[];
  selectedlistOfUsers: any[]=[];

  notificationTitle?:String="";
  notificationBody?:String="";
  notificationToken?:String="";
 
  finalToken?:String="";
  subToken?:String="";
  isHiddenProgress?:boolean=true;
  isHideMessage?:boolean=true;
  isCheck: boolean=false;
  isHide: boolean=false;

  constructor(private service:UserService,private router: Router,private messageService: MessageService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this. GetAllUsersWithDevices();

  }
  viewNotifications(){
    this.router.navigateByUrl('/notifications');
    }
  OnSendNotification(){
    this.isHideMessage = true;
    this.isHide=true;
    this.isHiddenProgress=false;
    this.addToken();
    console.log(this.finalToken?.length);
   if(this.finalToken?.length != 0){
    let data={
      isSave:this.isCheck,
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
    this.showSuccess()
    this.selectedlistOfUsers=[];
    this.finalToken='';
    this.notificationTitle ='';
    this.notificationBody ='';
    this.isCheck =false;
   }
   else{
    this. showError();
    this.isHiddenProgress=true;
    this.isHide=false;
    this.isHideMessage = false;
   }
    
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully Send'});
  }
  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'No Selected Customers'});
  }

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

       this.subToken = '"'+this.selectedlistOfUsers[i].device[j].deviceToken+'"' ;

       if(i == 0 && j == 0){
         this.finalToken =  ''+ this.subToken +'';
       }
        else{
         this.finalToken =  ''+ this.finalToken +','+ this.subToken +'';
       } 
      }
    }
  }
}
