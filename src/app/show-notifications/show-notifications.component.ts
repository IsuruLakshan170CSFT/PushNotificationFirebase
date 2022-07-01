import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-show-notifications',
  templateUrl: './show-notifications.component.html',
  styleUrls: ['./show-notifications.component.scss']
})
export class ShowNotificationsComponent implements OnInit {

  notificationsArray: any[]=[];

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.GetAllNotifications();
  }

  //new updates

  GetAllNotifications(){
    this.service.getAllNotifications()
    .subscribe
    (
      data=>{
        console.log(data);
        for(var i = 0; i < data.length ; i++){
          this.notificationsArray.push(data[i]);
          }
        console.log(this.notificationsArray.length);
      }
    );
  }

}
