import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Device ,UserModel ,Receiver ,Notifications,DeviceLazyLoad} from 'interfaces';
import { UserService } from '../notification-services/user.service';
import { LazyLoadEvent } from 'primeng/api';



@Component({
  selector: 'app-time-convert',
  templateUrl: './time-convert.component.html',
  styleUrls: ['./time-convert.component.scss']
})
export class TimeConvertComponent implements OnInit {

  deviceLoad:DeviceLazyLoad []=[];
  
  listOfUserDevices:Device[]=[];
  listOfAllUsers: UserModel[]=[];
  sendFor: Receiver[]=[];
  selectedlistOfUsers: any[]=[];
  notificationsArray: Notifications[]=[];
  finalToken?:String="";
  sendBy?:String="admin";
  subToken?:String="";
  isSave:boolean =false;
  isCustomerDevicePreview:boolean =true;
  loadingTitle:String="Loading";
  isBlock:boolean =false;
  isNewBtnDisable:boolean =true;
  listOfReceivers: any[]=[];
  dateTime?:Date;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;
  totalRecordsOfNotifications: number=0;
  totalRecordsOfDevices: number=20;
  cols: any[]=[];

  sendByField:String="";
  sendForField:String="";
  bodyField:String="";
  titleField:String="";
  timeFiled:String="";
  userField:String="";
  deviceField:String="";
  isInitDevice:boolean=false;
  isInitNotifications:boolean=false;

  rows:number=0;
  first:number=0;
  sortOrder:number=1;
  sortField:String="";
  filterUser:String="";
  filterDeviceName:String="";

  constructor(private service:UserService) { }

  ngOnInit(): void {

  //  this.getAllUserslength();
  }
//get all notifications
getAllUserslength(){
  this.service.getAllUsersLength()
  .subscribe
  (
    data=>{
     this.totalRecordsOfDevices =data.length;
     console.log("user devices Length");
     console.log(this.totalRecordsOfDevices);
    }
  );
}
  loadDevices(event: any) {
    this.isBlock =true;

    /*
    if(event.sortField == undefined ) {
      if(!this.isInitDevice){
        try{
          this.isInitDevice =true;
          this.sortOrder =1;
          this.sortField ='user';
          this.userField="";
          this.deviceField ="";
        }
        catch(error){
          console.log(error);
        }
      }
      else{
          if(event.filters['user'].value == null){
            this.userField=""; 
          }
          else{
            this.userField=event.filters['user'].value;
          }
          if(event.filters['deviceName'].value == null){
            this.deviceField=""; }
          else{
            this.deviceField=event.filters['deviceName'].value;
          }
      }
    }
    else{
      
      this.sortOrder =event.sortOrder;
      this.sortField =event.sortField;
      if(event.filters['user'].value == null){
        this.userField=""; }
      else{
        this.userField=event.filters['user'].value;
      }
      if(event.filters['deviceName'].value == null){
        this.deviceField=""; }
      else{
        this.deviceField=event.filters['deviceName'].value;
      }
    }
    let data={
      first:event.first,
      rows:event.rows,
      sortOrder:this.sortOrder,
      sortField:this.sortField,
      filterUser:this.userField,
      filterDeviceName:this.deviceField
    }

    */
    this.isBlock =false;


    this.rows =event.rows;
    this.first =event.first;
    this.sortOrder =event.sortOrder;
    this.sortField =event.sortField;
   
    if(this.isInitDevice){
      this.filterUser =event.filters.user.value;
      this.filterDeviceName =event.filters.deviceName.value;
    }
    else{
      this.filterUser ="";
      this.filterDeviceName ="";
      this.isInitDevice =true;
    }
    let data={
      first:this.first,
      rows:this.rows ,
      sortOrder:this.sortOrder,
      sortField:this.sortField,
      filterUser:this.filterUser,
      filterDeviceName:this.filterDeviceName
    }
    console.log(data);

    this.getAllUsersWithDevices(data);
  }
  
  getAllUsersWithDevices(event: any){
 
    this.isBlock =true;
    this.service.getAllUsers(event)
    .subscribe
    (
      data=>{
        this.listOfAllUsers =[];
        for(var i = 0; i < data.length ; i++){
          this.listOfAllUsers.push(data[i]);
          }
         this.changeOrderOfDeviceUser();
          this.isBlock =false;
  
          console.log(this.listOfAllUsers);
      }
    );
  }

  changeOrderOfDeviceUser(){
    var arrayLength = this.listOfAllUsers.length;
      for(let i=0;i<arrayLength ;i++){
        if(this.sortOrder == 1 && this.sortField == "deviceName"){
          this.listOfAllUsers[i].devices.sort((a, b) => (a.deviceName > b.deviceName) ? 1 : -1);  
        }
        else{
          this.listOfAllUsers[i].devices.sort((a, b) => (a.deviceName > b.deviceName) ? -1 : 1);
        }
      } 
}

onClickMoreDevices(product:any){
  this.listOfReceivers =[];
  this.listOfReceivers =product.devices;
}

}
