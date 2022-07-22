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

  sendByField:String="";
  sendForField:String="";
  bodyField:String="";
  titleField:String="";
  timeFiled:String="";
 

  isInitNotifications:boolean=false;

  rows:number=0;
  first:number=0;
  sortOrder:number=-1;
  sortField:String="";
  filterTitle:String="";
  filterBody:String="";
  filterSendFor:String="";
  filterSendBy:String="";
  filterTime:String="";

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
  

  loadCustomers(event: any) {

    this.rows =event.rows;
    this.first =event.first;
    this.sortOrder =event.sortOrder;
    this.sortField =event.sortField;

    if(this.isInitNotifications){
      this.filterTitle =event.filters.title.value;
      this.filterBody =event.filters.body.value;
      this.filterSendFor =event.filters.sendFor.value;
      this.filterSendBy =event.filters.sendBy.value;
      this.filterTime =event.filters.time.value;
    }
    else{
      this.filterTitle ="";
      this.filterBody ="";
      this.filterSendFor ="";
      this.filterSendBy ="";
      this.filterTime ="";
      this.isInitNotifications =true;
    }
    
    let data={
      first:this.first,
      rows:this.rows,
      sortField:this.sortField,
      sortOrder:this.sortOrder,
      filterTitle:this.filterTitle,
      filterBody:this.filterBody,
      filterSendBy:this.filterSendBy,
      filterSendFor:this.filterSendFor,
      filterTime:this.filterTime
    }
    

  this.getAllNotificationstestFunction(data);
    
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
