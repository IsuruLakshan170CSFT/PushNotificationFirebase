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

  constructor(private service:UserService) { 
      this.representatives = [
      {name: "Amy Elsner", image: 'amyelsner.png'},
      {name: "Anna Fali", image: 'annafali.png'},
      {name: "Asiya Javayant", image: 'asiyajavayant.png'},
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
 //  this.GetAllNotificationslength();
  }

  

  loadCustomers(event: LazyLoadEvent) {
    this.getAllNotificationstest(event);
   

    console.log("loadCustomers");
    console.log(event);
    // console.log(event.sortOrder);
    // console.log(event.rows);
    // let array=event.filters;
  
    // let array1=event.sortOrder;
    // let array2=event.sortField;
    // console.log(array);
    // console.log(event.filters);
    
}

//test
getAllNotificationstest(event: LazyLoadEvent){
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
