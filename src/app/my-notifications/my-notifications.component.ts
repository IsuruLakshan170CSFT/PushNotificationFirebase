import { Component, OnInit } from '@angular/core';
import { UserService } from '../notification-services/user.service';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.scss']
})
export class MyNotificationsComponent implements OnInit {

   isHiddenLogin?:boolean=false;
   isHiddenProgress?:boolean=true;
   userName?:String="";
   notificationsArray: any[]=[];
   myNotificationsArray: any[]=[];
   constructor(private service:UserService) { }

  ngOnInit(): void {
    this.onGetAllNotifications();
  }
  //get all notifications
  onGetAllNotifications(){
    this.service.getAllNotifications()
    .subscribe
    (
      data=>{
        for(var i = 0; i < data.length ; i++){
          this.notificationsArray.push(data[i]);
          }
      }
    )
    
}

onGetMyNotifications(){
  this.myNotificationsArray =[];
  console.log(this.notificationsArray.length);
  console.log(this.notificationsArray);
  console.log("name : "+ this.userName)

  for(var i=0;i<this.notificationsArray.length;i++){
   const customerArray =  this.notificationsArray[i].sendFor;
   for(var j=0;j<customerArray.length;j++){
    if(customerArray[j] == this.userName){
      this.myNotificationsArray.push(this.notificationsArray[i]);
    }
    console.log(customerArray[j])
   }

  }
  console.log(this.myNotificationsArray.length)
  console.log(this.myNotificationsArray)
}

}
