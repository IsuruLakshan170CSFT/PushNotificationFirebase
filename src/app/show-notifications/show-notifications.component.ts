import { Component, OnInit } from '@angular/core';
import { UserService } from '../notification-services/user.service';
import { LazyLoadEvent } from 'primeng/api';

export interface Representative {
  name?: string;
  image?: string;
}

export interface Country {
  name?: string;
  code?: string;
}
export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: boolean;
}

@Component({
  selector: 'app-show-notifications',
  templateUrl: './show-notifications.component.html',
  styleUrls: ['./show-notifications.component.scss']
})
export class ShowNotificationsComponent implements OnInit {

  customers: Customer[]=[];

  totalRecords: number=0;

  cols: any[]=[];

  loading: boolean;
  totalRecordsOfNotifications: number=20;
  representatives: Representative[];

  selectAll: boolean = false;

  selectedCustomers: Customer[]=[];

  notificationsArray: any[]=[];

  //test
  eventData:LazyLoadEvent []=[];
  sortField:String="";
  sendByField:String="";
  sendForField:String="";
  bodyField:String="";
  titleField:String="";
  timeFiled:String="";
  sortOrder:number=1;


  constructor(private service:UserService) { 
      this.representatives = [
      {name: "Amy", image: 'amyelsner.png'},
      {name: "Abc", image: 'asd.png'},
      {name: "Anna Fali", image: 'annafali.png'},
      {name: "Abiya Javayant", image: 'asiyajavayant.png'},
      {name: "Bernardo Dominic", image: 'bernardodominic.png'},
      {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
      {name: "Ioni Bowcher", image: 'ionibowcher.png'},
      {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
      {name: "Onyama Limba", image: 'onyamalimba.png'},
      {name: "Stephen Shaw", image: 'stephenshaw.png'},
      {name: "Xuxue Feng", image: 'xuxuefeng.png'}
  ];
  this.loading = false;
  
  }

  ngOnInit(): void {
    this.testfilter();
 //  this.GetAllNotificationslength();
  }

  testfilter(){
    var data="ab";
    var stringField="name";
    
    this.representatives = this.representatives.filter(
      t=>
      { var dataLength=data.length;
       var newName=t.name;
       var strFirstThree = newName?.substring(0,dataLength);
       data=data.toLowerCase();
       strFirstThree=strFirstThree?.toLocaleLowerCase();
        return strFirstThree == data}
      
      );
    console.log(this.representatives);
  }
  

  loadCustomers(event: LazyLoadEvent) {
    if(event.sortField == undefined){
    //  console.log("undefined");
      this.sortField ='time';
      this.timeFiled="",
      this.bodyField ="",
      this.titleField="",
      this.sendForField="",
      this.sendByField="",
      this.sortOrder=-1
    }
    
    else{
      this.sortField =event.sortField;
      this.timeFiled="",
      this.bodyField ="abc",
      this.titleField="",
      this.sendForField="",
      this.sendByField="";
      this.sortOrder=1

  
    }
  
  
   
   // console.log(event);
    
    let data={
      first:event.first,
      rows:event.rows,
      sortField:this.sortField,
      sortOrder:this.sortOrder,
      filterTitle:this.titleField,
      filterBody:this.bodyField,
      filterSendBy:this.sendByField,
      filterSendFor:this.sendForField,
      filterTime:this.timeFiled
    }
    
  // console.log(data);
  // this.getAllNotificationstestFunction(data);
    
}

//test
getAllNotificationstestFunction(event: any){
  this.loading = true;
  this.service.getAllNotificationstest(event)
  .subscribe
  (
    data=>{
      this.notificationsArray =[];
      for(var i = 0; i < data.length ; i++){
        this.notificationsArray.push(data[i]);
        }
          this.loading = false;

      console.log("data");
      console.log(data);
    }
  );
}

//get all notifications
  GetAllNotifications(){
    this.service.getAllNotifications()
    .subscribe
    (
      data=>{
        for(var i = 0; i < data.length ; i++){
          this.notificationsArray.push(data[i]);
          }
      }
    );
  }

  //get all notifications
  GetAllNotificationslength(){
    this.service.getAllUsersLength()
    .subscribe
    (
      data=>{
       console.log(data.length);
      }
    );
  }

}
